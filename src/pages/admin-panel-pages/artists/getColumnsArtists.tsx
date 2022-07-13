import React from 'react'
import { IArtist } from "@/processes/models/IArtist";

function getColumnsArtists(edKey:number | null, edit:unknown, cancel:unknown, save:unknown) {
  const isEditing = (record:IArtist) => record.key === edKey

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
      title: 'fk_id_user',
      dataIndex: 'fk_id_user',
      key: 'fk_id_user',
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
      title: 'surname',
      dataIndex: 'surname',
      key: 'surname',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'patronymic',
      dataIndex: 'patronymic',
      key: 'patronymic',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'document',
      dataIndex: 'document',
      key: 'document',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
      dataType: 'text',
      editable: true,
    },

    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'inn',
      dataIndex: 'inn',
      key: 'inn',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'snils',
      dataIndex: 'snils',
      key: 'snils',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'bank_details',
      dataIndex: 'bank_details',
      key: 'bank_details',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_number',
      dataIndex: 'contract_number',
      key: 'contract_number',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_agreement',
      dataIndex: 'contract_agreement',
      key: 'contract_agreement',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'contract_fee',
      dataIndex: 'contract_fee',
      key: 'contract_fee',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_fee_in_words',
      dataIndex: 'contract_fee_in_words',
      key: 'contract_fee_in_words',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'contract_expiration_date',
      dataIndex: 'contract_expiration_date',
      key: 'contract_expiration_date',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'deleted',
      dataIndex: 'deleted',
      key: 'deleted',
      dataType: 'dropdown-deleted',
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

export default getColumnsArtists
