import React from 'react'

function getColumns(firstRow, edKey, setEdKey, edit, cancel, save) {
  const isEditing = record => record.key === edKey

  const columns = [
    {
      title: 'ref',
      dataIndex: 'id_artist_contract',
      key: 'link',
      dataType: 'link',
      linkfield: 'id_artist_contract',
    },
    {
      title: 'id_artist_contract',
      dataIndex: 'id_artist_contract',
      key: 'id_artist_contract',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'creative_pseudonym',
      dataIndex: 'creative_pseudonym',
      key: 'creative_pseudonym',
      dataType: 'text',
      editable: true,
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
          linkfield: col.linkfield,
          dataType: col.dataType,
          dataIndex: col.dataIndex,
          title: col.title,
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

export default getColumns
