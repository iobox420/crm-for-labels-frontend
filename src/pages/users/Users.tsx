import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { getUsers } from '@/redux/admin/getUsers'
import { Form, Table } from 'antd'
import moment from 'moment'
import { updateUser } from '@/redux/admin/updateUser'
import EditableCell, { TRecord } from "@/components/EditableCell";
import { setEditingKey } from '@/redux/admin/adminSlice'

const Users = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers())
    return () => {
      dispatch(setEditingKey(''))
    }
  }, [dispatch])
  //key	id_user	email	password	role	created_at	deleted	operation
  const admin = useAppSelector(state => state.admin)
  let users = useAppSelector(state => state.admin.users)

  users = users.map((user, i) => {
    return {
      ...user,
      key: i,
      created_at: moment(user.created_at),
      deleted: JSON.stringify(user.deleted),
    }
  }) as any

  const [form] = Form.useForm()
  const editingKey = admin.editingKey
  // @ts-ignore
  const isEditing = record => record.key === editingKey
  // @ts-ignore

  const edit = useCallback(record => {
    form.setFieldsValue({
      ...record,
    })
    dispatch(setEditingKey(record.key))
  },[form,dispatch])


  const cancel = useCallback(() => {
    dispatch(setEditingKey(''))
  },[dispatch])

  // @ts-ignore
  const save = useCallback(async () => {
    try {
      const user = await form.validateFields()
      const userCastedToTypes = {
        ...user,
        created_at: user.created_at.format('YYYY-MM-DD'),
      }
      // @ts-ignore
      dispatch(updateUser(userCastedToTypes))
      console.log('dp new user', user)
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
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
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
        // @ts-ignore
        onCell: record => ({
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
      // @ts-ignore
      onCell: record => ({
        record,
        dataType: col.dataType,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    }
  })

  console.log('users', users)
  if (admin.isLoadingUsers) {
    return <>Loading</>
  }
  console.log(admin)
  if (admin.usersError !== '') {
    return <>ошибка</>
  }
  console.log('render table')
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
      />
      ;
    </Form>
  )
}

export default Users
