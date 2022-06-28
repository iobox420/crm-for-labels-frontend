import { Table } from "antd";
import React from "react";
import NewCell from "@/pages/admin-panel-pages/ArtistsRQ/EditableCell";
import EditableCell from "@/pages/admin-panel-pages/ArtistsRQ/EditableCell";


// @ts-ignore
const TableEditablev1 = ({ data, columns }) => {
  // @ts-ignore
  const dataWithKey = data.map((row, i) => {
    return {
      key: i,
      ...row,
    }
  })
  return (
    <div>
      <Table components={{
        body: {
          cell: EditableCell,
        },
      }} dataSource={dataWithKey}  columns={columns} pagination={{
        pageSize: 100,
      }} />
    </div>
  )
}

export default TableEditablev1
