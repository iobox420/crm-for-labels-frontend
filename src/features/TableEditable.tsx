import { Table } from 'antd'
import React from 'react'
import { AxiosRequestConfig, AxiosResponseHeaders } from "axios";


function TableEditable({ data, columns }) {
/*  const dataWithKey = data.map((row, i) => {
    return {
      key: i,
      ...row,
    }
  })*/
  return (
    <div>
      <Table dataSource={data} columns={columns} pagination={{
        pageSize: 10,
      }} />
    </div>
  )
}

export default TableEditable
