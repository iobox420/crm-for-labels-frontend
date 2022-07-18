function getColumnsActs(edKey:number | null, edit:unknown, cancel:unknown, save:unknown, deletef:unknown) {
  const isEditing = (record:any) => record.key === edKey
  const columns = [

    {
      title: 'id_act',
      dataIndex: 'id_act',
      key: 'id_act',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'fk_id_user',
      dataIndex: 'fk_id_user',
      key: 'fk_id_user',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'fk_id_artist_contract',
      dataIndex: 'fk_id_artist_contract',
      key: 'fk_id_artist_contract',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      dataType: 'date',
      editable: false,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      dataType: 'operation',
    },
  ]

  const colsWithProps = columns.map(col => {
    return {
      ...col,
      onCell: (record: any) => {
        return {
          record,
          /*linkfield: col.linkfield,*/
          dataType: col.dataType,
          dataIndex: col.dataIndex,
          title: col.title,
          deletef:deletef,
          edit: edit,
          save: save,
          cancel: cancel,
          edKey: edKey,
          editable: col.editable,
          editing: isEditing(record),
        }
      },
    }
  })

  return colsWithProps
}

export default getColumnsActs
