import { Form, Input, InputNumber, Typography, Popconfirm, DatePicker, Select } from 'antd'

const { Option } = Select
import React from 'react'

export type TRecord = any

export interface IEditableCell {
  editing:boolean
  dataIndex: number,
  title: string,
  inputType: string,
  // по идее у record тип объект, но компонент EditableCell является
  // переиспользуемым компонентов, соответственно я хз как тут указать динамичный тип
  // тут может быть и IUserFull и IArtist
  record:TRecord,
  index:number,
  children: React.ReactNode,
  dataType:string,
  isEditing: (record:TRecord) => boolean,
  save: (recordKey:number) => void,
  edit:(record:TRecord) => void,
  cancel:() => void,
  editingKey:string,
}

const EditableCell:React.FC<IEditableCell> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  dataType,
  isEditing,
  save,
  edit,
  cancel,
  editingKey,
  ...restProps
}) => {
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
                required: false,
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
          <Form.Item name={dataIndex} rules={[{ required: false }]}  style={{
            margin: 0,
          }}>
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
          <Form.Item name={dataIndex} rules={[{ required: false }]}  style={{
            margin: 0,
          }}>
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

  if (dataType === 'operation') {
    {
      const editable = isEditing(record)
      return editable ? (
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
            disabled={editingKey !== ''}
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

  return <td {...restProps}> <Form.Item name={dataIndex} rules={[{ required: false }]}  style={{
    margin: 0,
  }}>{children}</Form.Item></td>
}
export default EditableCell
