import React from 'react'
import { IArtist } from '@/processes/models/IArtist'

function getColumnsTracks(
  edKey: number | null,
  edit: unknown,
  cancel: unknown,
  save: unknown,
  deletef: unknown,
) {
  const isEditing = (record: IArtist) => record.key === edKey

  const columns = [
    {
      title: 'record_path',
      dataIndex: 'record_path',
      key: 'record_path',
      dataType: 'upload',
      linkfield: 'id_artist_contract',
      editable: true,
    },
    {
      title: 'id_track',
      dataIndex: 'id_track',
      key: 'id_track',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'fk_id_album',
      dataIndex: 'fk_id_album',
      key: 'fk_id_album',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'fk_id_act',
      dataIndex: 'fk_id_act',
      key: 'fk_id_act',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'fk_id_release',
      dataIndex: 'fk_id_release',
      key: 'fk_id_release',
      dataType: 'text',
      editable: true,
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
      editable: true,
    },
    {
      title: 'id_for_dmg',
      dataIndex: 'id_for_dmg',
      key: 'id_for_dmg',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'author_of_music',
      dataIndex: 'author_of_music',
      key: 'author_of_music',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'author_of_text',
      dataIndex: 'author_of_text',
      key: 'author_of_text',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'phonogram_timing',
      dataIndex: 'phonogram_timing',
      key: 'phonogram_timing',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'date_of_registration',
      dataIndex: 'date_of_registration',
      key: 'date_of_registration',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'share_of_copyright',
      dataIndex: 'share_of_copyright',
      key: 'share_of_copyright',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'share_of_related_rights',
      dataIndex: 'share_of_related_rights',
      key: 'share_of_related_rights',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'rao',
      dataIndex: 'rao',
      key: 'rao',
      dataType: 'dropdown-deleted',
      editable: true,
    },
    {
      title: 'voice',
      dataIndex: 'voice',
      key: 'voice',
      dataType: 'dropdown-deleted',
      editable: true,
    },
    {
      title: 'zaicev',
      dataIndex: 'zaicev',
      key: 'zaicev',
      dataType: 'dropdown-deleted',
      editable: true,
    },
    {
      title: 'mix_upload',
      dataIndex: 'mix_upload',
      key: 'mix_upload',
      dataType: 'dropdown-deleted',
      editable: true,
    },
    {
      title: 'PO',
      dataIndex: 'PO',
      key: 'PO',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'PO_number',
      dataIndex: 'PO_number',
      key: 'PO_number',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'UPC',
      dataIndex: 'UPC',
      key: 'UPC',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'ISRC',
      dataIndex: 'ISRC',
      key: 'ISRC',
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
          linkfield: col.linkfield,
          dataType: col.dataType,
          dataIndex: col.dataIndex,
          title: col.title,
          deletef: deletef,
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

export default getColumnsTracks
