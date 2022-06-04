// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd'
import { getArtists } from '@/redux/getArtists'
import { useDispatch, useSelector } from 'react-redux'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const ArtistsTable = ({ artists }) => {
  console.log('art', artists)
  const [form] = Form.useForm()
  const [data, setData] = useState(artists)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = record => record.key === editingKey

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async key => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'name_2',
      dataIndex: 'name_2',
      width: '15%',
      editable: true,
    },
    {
      title: 'name_1',
      dataIndex: 'name_1',
      width: '15%',
      editable: true,
    },
    {
      title: 'name_3',
      dataIndex: 'name_3',
      width: '15%',
      editable: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: 'document',
      dataIndex: 'document',
      width: '15%',
      editable: true,
    },
    {
      title: 'creative_pseudonym',
      dataIndex: 'creative_pseudonym',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )
      },
    },
  ]
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    // noinspection JSUnusedGlobalSymbols
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

const Artists = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArtists())
  }, [dispatch])

  const admin = useSelector(state => state.admin)
  let artists = useSelector(state => state.admin.artists)
  artists = artists.map((ar, i) => {
    return {
      key: String(i),
      ...ar,
    }
  })
  if (!admin.isLoadingArtists) {
    return <>Loading</>
  }
  return <ArtistsTable artists={artists} />
}

export default Artists
