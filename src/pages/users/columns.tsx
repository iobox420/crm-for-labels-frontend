// @ts-nocheck
import { Popconfirm, Typography } from 'antd'
import React from 'react'

const Columns = [
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

export default Columns
