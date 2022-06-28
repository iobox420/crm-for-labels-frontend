// noinspection DuplicatedCode

import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/processes/redux/hooks'
import { Form, Table } from 'antd'
import moment from 'moment'
import EditableCell, { TRecord } from '@/shared/EditableCell'
import { setEditingKey } from '@/processes/redux/admin/adminSlice'
import { getArtists } from '@/processes/redux/admin/getArtists'
import { updateArtist } from '@/processes/redux/admin/updateArtist'
import { Link } from 'react-router-dom'

const Artists = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getArtists({ page: 1, limit: 10 }))
    return () => {
      dispatch(setEditingKey(''))
    }
  }, [dispatch])
  //key	id_user	email	password	role	createdAt	deleted	operation
  const admin = useAppSelector(state => state.admin)
  let artists = useAppSelector(state => state.admin.artists)

  artists = artists.map((artist, i) => {
    return {
      ...artist,
      key: i,
      ref:<Link to={`${artist.id_artist_contract}`}>to artist page</Link>,
      contract_agreement: moment(artist.contract_agreement),
      contract_expiration_date: moment(artist.contract_expiration_date),
      deleted: JSON.stringify(artist.deleted),
    }
  }) as any

  const [form] = Form.useForm()
  const editingKey = admin.editingKey

  const isEditing = (record: TRecord) => record.key === editingKey

  const edit = useCallback(
    (record: TRecord) => {
      form.setFieldsValue({
        ...record,
      })
      console.log(record);
      dispatch(setEditingKey(record.key))
    },
    [form, dispatch],
  )

  const cancel = useCallback(() => {
    dispatch(setEditingKey(''))
  }, [dispatch])

  const save = useCallback(async () => {
    try {
      const artist = await form.validateFields()
      console.log(artist);
      const userCastedToTypes = {
        ...artist,
        contract_agreement: artist.contract_agreement.format('YYYY-MM-DD'),
        contract_expiration_date: artist.contract_expiration_date.format('YYYY-MM-DD'),
        deleted: artist.deleted,
      }

      dispatch(updateArtist(userCastedToTypes))
    } catch (errInfo) {
      console.log(errInfo);
    }
  }, [form, dispatch])
  /*
   key	id_artist_contract	fk_id_user	creative_pseudonym	surname	name
   patronymic	document	address	email	inn	snils	bank_details
   contract_number	contract_agreement	contract_fee	contract_fee_in_words
   contract_expiration_date	deleted	operation
  */
  const columns = [
    {
      title: 'ref',
      dataIndex: 'ref',
      key: 'ref',
      dataType: 'ref',
      editable: false,
    },
    {
      title: 'id_artist_contract',
      dataIndex: 'id_artist_contract',
      key: 'id_artist_contract',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'fk_id_user',
      dataIndex: 'fk_id_user',
      key: 'fk_id_user',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'creative_pseudonym',
      dataIndex: 'creative_pseudonym',
      key: 'creative_pseudonym',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'surname',
      dataIndex: 'surname',
      key: 'surname',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'patronymic',
      dataIndex: 'patronymic',
      key: 'patronymic',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'document',
      dataIndex: 'document',
      key: 'document',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
      dataType: 'text',
      editable: true,
    },

    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'inn',
      dataIndex: 'inn',
      key: 'inn',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'snils',
      dataIndex: 'snils',
      key: 'snils',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'bank_details',
      dataIndex: 'bank_details',
      key: 'bank_details',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_number',
      dataIndex: 'contract_number',
      key: 'contract_number',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_agreement',
      dataIndex: 'contract_agreement',
      key: 'contract_agreement',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'contract_fee',
      dataIndex: 'contract_fee',
      key: 'contract_fee',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_fee_in_words',
      dataIndex: 'contract_fee_in_words',
      key: 'contract_fee_in_words',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_expiration_date',
      dataIndex: 'contract_expiration_date',
      key: 'contract_expiration_date',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'deleted',
      dataIndex: 'deleted',
      key: 'deleted',
      dataType: 'dropdown-deleted',
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

        onCell: (record: TRecord) => ({
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

      onCell: (record: TRecord) => ({
        record,
        dataType: col.dataType,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    }
  })

  if (admin.isLoadingArtists) {
    return <>Loading</>
  }
  if (admin.artistsError !== '') {
    return <>ошибка</>
  }
  return (
    <Form form={form} component={false}>
      <Table
        dataSource={artists}
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
          total: admin.artistsCount,
          onChange: page => {
            dispatch(
              getArtists({
                page: page,
                limit: 10,
              }),
            )
          },
        }}
      />
      ;
    </Form>
  )
}

export default Artists
