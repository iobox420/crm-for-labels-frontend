import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space } from 'antd'
import { IAlbum } from '@/models/IAlbum'

interface IAlbumsTable {
  albums: IAlbum[]
}

const AlbumsTable: React.FC<IAlbumsTable> = ({ albums }) => {
  const columns = Object.keys(albums[0]).map(key => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    }
  })
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={'Albums'} size="default">
          <TableEditable data={albums} columns={columns} />
        </Card>
      </Space>
    </div>
  )
}

export default AlbumsTable
