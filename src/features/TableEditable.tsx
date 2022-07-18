import { Table } from 'antd'
import React from 'react'


function TableEditable({ data, columns }:any) {

  return (
    <div>
      <Table dataSource={data} columns={columns} pagination={{
        pageSize: 10,
      }} />
    </div>
  )
}

export default TableEditable
