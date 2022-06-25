import { Table } from 'antd'
import React from 'react'

const TableEditable = ({ data, columns }) => {
  const dataWithKey = data.map((row, i) => {
    return {
      key: i,
      ...row,
    }
  })
  return (
    <div>
      <Table dataSource={dataWithKey} columns={columns} />;
    </div>
  )
}

export default TableEditable
