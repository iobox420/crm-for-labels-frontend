import { Table } from "antd";
import React from "react";
import EditableCell from "@/shared/EditableCell";

export interface ITableEditable<D, C=any>  {
  data: D;
  columns: C;
}

function TableEditablev <ITableEditable> ({ data, columns, count, setPage, pageSize }) {

  return (
    <div>
      <Table components={{
        body: {
          cell: EditableCell,
        },
      }} dataSource={data}  columns={columns} pagination={{
        pageSize: pageSize,
        total: count,
        onChange: page => {
          setPage(page)
        },
      }} />
    </div>
  )
}

export default TableEditablev
