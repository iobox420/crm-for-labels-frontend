import { Form, Input, InputNumber, Typography, Popconfirm, DatePicker, Select } from 'antd'

const { Text } = Typography
import { Link } from 'react-router-dom'

const { Option } = Select
import React from 'react'

export type TRecord = any

export interface IEditableCell {
  editing: boolean
  dataIndex: number
  title: string
  record: TRecord
  children: React.ReactNode
  dataType: string
  edKey: null | number
  save: (recordKey: number) => void
  edit: (record: any) => void
  cancel: () => void
  editable: boolean
  linkfield: string
}

const EditableCell: React.FC<IEditableCell> = ({
  editing,
  dataIndex,
  title,
  record,
  children,
  dataType,
  save,
  edit,
  edKey,
  cancel,
  editable,
  linkfield,
  ...restProps
}) => {
  if (editable) {
    if (dataType === 'text') {
      if (editing) {
        return (
          <td {...restProps}>
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
              <Input />
            </Form.Item>
          </td>
        )
      }
    }
    if (dataType === 'number') {
      if (editing) {
        return (
          <td {...restProps}>
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: false,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </td>
        )
      }
    }
    if (dataType === 'date') {
      if (editing) {
        return (
          <td {...restProps}>
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: false,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <DatePicker format={'DD.MM.YYYY'} />
            </Form.Item>
          </td>
        )
      }

      return <td {...restProps}>{record[dataIndex].format('DD.MM.YYYY')}</td>
    }
    if (dataType === 'dropdown-deleted') {
      if (editing) {
        return (
          <td {...restProps}>
            <Form.Item
              name={dataIndex}
              rules={[{ required: false }]}
              style={{
                margin: 0,
              }}
            >
              <Select placeholder="Select a option and change input text above" allowClear>
                <Option value="true">true</Option>
                <Option value="false">false</Option>
              </Select>
            </Form.Item>
          </td>
        )
      }
    }
    if (dataType === 'dropdown-role') {
      if (editing) {
        return (
          <td {...restProps}>
            <Form.Item
              name={dataIndex}
              rules={[{ required: false }]}
              style={{
                margin: 0,
              }}
            >
              <Select placeholder="Select a option and change input text above" allowClear>
                <Option value="admin">admin</Option>
                <Option value="admin_not_activated">admin_not_activated</Option>
                <Option value="artist">artist</Option>
              </Select>
            </Form.Item>
          </td>
        )
      }
    }

    return (
      <td {...restProps}>
        <Form.Item
          /*name={dataIndex} */ rules={[{ required: false }]}
          style={{
            margin: 0,
          }}
        >
          {children}
        </Form.Item>
      </td>
    )
  }
  if (dataType === 'link') {
    debugger
    return (
      <td {...restProps}>
        <Link to={`/users/${record[linkfield]}`}>to artist page</Link>
      </td>
    )
  }
  if (dataType === 'operation') {
    {
      return editing ? (
        <td {...restProps}>
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
        </td>
      ) : (
        <td {...restProps}>
          <Typography.Link
            disabled={edKey !== null}
            onClick={() => {
              edit(record)
            }}
          >
            Edit
          </Typography.Link>
        </td>
      )
    }
  }
  return (
    <td {...restProps}>
      <Form.Item
        name={dataIndex}
        rules={[{ required: false }]}
        style={{
          margin: 0,
        }}
      >
        <Text>{record[dataIndex]}</Text>
      </Form.Item>
    </td>
  )
}
export default EditableCell
