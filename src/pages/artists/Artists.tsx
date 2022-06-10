import React, { useEffect, useState } from 'react'
import { Button, Form, Popconfirm, Table, Typography } from 'antd'
import { getArtists } from '@/redux/admin/getArtists'
import {deleteRow} from '@/redux/admin/adminSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import EditableCell from '@/pages/artists/EditableCell'
import { IArtist } from '@/models/IArtist'
import getCols from './getCols'
import { updateArtist } from "@/redux/admin/updateArtist";
import { addRow } from '@/redux/admin/adminSlice'
import { addArtist } from "@/redux/admin/addArtist";

const Artists = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(getArtists())
  }, [dispatch])

  const admin = useAppSelector(state => state.admin)
  let artists = useAppSelector(state => state.admin.artists)
  if (admin.isLoadingArtists) {
    return <>Loading</>
  }
  const deleteRowHandle = () => {
    // @ts-ignore
    dispatch(deleteRow());
  }

  const addArtistRowHandle = () => {
    // @ts-ignore
    dispatch(addRow());
  }
  return (
    <div>
      <ArtistsTable artists={artists} />
      <div>
        <Button type="primary" onClick={deleteRowHandle}>удалить строку</Button>
        <Button type="primary" onClick={addArtistRowHandle}>Добавить артиста</Button>
      </div>
    </div>
  )
}
export default Artists


// @ts-ignore
const ArtistsTable = ({artists}) => {
  const dispatch = useAppDispatch()
  console.log('artist table component');
  artists = artists.map((ar:IArtist, i:number) => {
    return {
      key: String(i),
      ...ar,
    }
  })

  console.log('art', artists)
  const [form] = Form.useForm()
/*  const [artists, setArtists] = useState(artists)*/
  const [editingKey, setEditingKey] = useState('')

  // @ts-ignore
  const isEditing = record => record.key === editingKey

  // @ts-ignore
  const edit = record => {

    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  // @ts-ignore
  const save = async key => {
    try {
      const row = await form.validateFields()
      console.log('dp new row', row);
      if (row.id_artist_contract === 0){
        // @ts-ignore
        dispatch(addArtist(row));
      }
      // @ts-ignore
      dispatch(updateArtist(row));
      setEditingKey('')

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }


  const cols2 = getCols(artists[0])

  // @ts-ignore
  const columns = [
    // @ts-ignore
    ...cols2,

    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => {
            edit(record)
          }}>
            Edit
          </Typography.Link>
        )
      },
    },
  ]
  console.log(columns);
  const mergedColumns = columns.map(col => {
    // @ts-ignore
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      // @ts-ignore
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        // title: col.title,
        editing: isEditing(record),// record => record.key === editingKey
      }),
    }
  })


  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={artists}
        // @ts-ignore
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 25
        }}
      />
    </Form>
  )
}

