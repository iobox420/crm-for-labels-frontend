import { Table } from 'antd'
import React from 'react'

// @ts-ignore
const TableEditable = ({ data, columns }) => {
  // @ts-ignore
  const dataWithKey = data.map((row, i) => {
    return {
      key: i,
      ...row,
    }
  })
  return (
    <div>
      <Table dataSource={dataWithKey} columns={columns} pagination={{
        pageSize: 10,
      }} />
    </div>
  )
}

export default TableEditable
