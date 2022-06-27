// noinspection DuplicatedCode

import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/processes/redux/hooks'
import { getUsers } from '@/processes/redux/admin/getUsers'
import { Form, Table } from 'antd'
import moment from 'moment'
import { updateUser } from '@/processes/redux/admin/updateUser'
import EditableCell, { TRecord } from "@/shared/EditableCell";
import { setEditingKey } from '@/processes/redux/admin/adminSlice'

const Users = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers({
      page:1,
      limit:10
    }))
    return () => {
      dispatch(setEditingKey(''))
    }
  }, [dispatch])
  //key	id_user	email	password	role	createdAt	deleted	operation
  const admin = useAppSelector(state => state.admin)
  let users = useAppSelector(state => state.admin.users)

  users = users.map((user, i) => {
    return {
      ...user,
      key: i,
      ref:user.id_user,
      createdAt: moment(user.createdAt),
      updatedAt: moment(user.updatedAt),
      deleted: JSON.stringify(user.deleted),
    }
  }) as any

  const [form] = Form.useForm()
  const editingKey = admin.editingKey

  const isEditing =  (record: TRecord)  => record.key === editingKey


  const edit = useCallback( (record: TRecord)  => {
    form.setFieldsValue({
      ...record,
    })
    dispatch(setEditingKey(record.key))
  },[form,dispatch])


  const cancel = useCallback(() => {
    dispatch(setEditingKey(''))
  },[dispatch])


  const save = useCallback(async () => {
    try {
      const user = await form.validateFields()
      const userCastedToTypes = {
        ...user,
        createdAt: user.createdAt.format('YYYY-MM-DD'),
        updatedAt: user.updatedAt.format('YYYY-MM-DD'),
      }
      dispatch(updateUser(userCastedToTypes))
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  },[form, dispatch])

  const columns = [

    {
      title: 'id_user',
      dataIndex: 'id_user',
      key: 'id_user',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
      dataType: 'dropdown-role',
      editable: true,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'deleted',
      dataIndex: 'deleted',
      dataType: 'dropdown-deleted',
      key: 'deleted',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      dataType: 'operation',
    },
  ]
  // добавляем новые пропсы для того что бы ими воспользоваться когда будем отрендерить ячейку с помощью компонента Editable cell
  const columnsWithNewProps = columns.map(col => {
    if (col.dataType === 'operation') {
      return {
        ...col,
        // вот эта функция вызывается при каждом рендеринг ячейки скорее всего
        onCell: (record: TRecord) => {
          return {
            record,
            dataType: col.dataType,
            dataIndex: col.dataIndex,
            title: col.title,
            save: save,
            edit: edit,
            cancel: cancel,
            isEditing: isEditing,
            editingKey: editingKey,
          }
        },
      }
    }
    if (col.editable) {
      return {
        ...col,

        onCell:  (record: TRecord)  => ({
          record,
          dataType: col.dataType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record), // record => record.key === editingKey
        }),
      }
    }

    return {
      ...col,

      onCell:  (record: TRecord)  => ({
        record,
        dataType: col.dataType,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    }
  })

  if (admin.isLoadingUsers) {
    return <>Loading</>
  }
  if (admin.usersError !== '') {
    return <>ошибка</>
  }
  const totalPages = Math.ceil(admin.usersCount/10)
  return (
    <Form form={form} component={false}>
      <Table
        dataSource={users}
        // производим замену стандартного компонента ячейка на компонент EditableCell
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowClassName="editable-row"
        columns={columnsWithNewProps}
        pagination={{
          pageSize: 10,
          total: admin.usersCount,
          onChange: (page) => {
            dispatch(getUsers({
              page:page,
              limit:10
            }))
          },
        }}

      />
      ;
    </Form>
  )
}

export default Users
