import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space } from 'antd'
import { IRelease } from '@/models/IRelease'

interface IAlbumsTable {
  releases: IRelease[]
}

const ReleasesTable: React.FC<IAlbumsTable> = ({ releases }) => {
  const columns = Object.keys(releases[0]).map(key => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    }
  })
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={'Releases'} size="default">
          <TableEditable data={releases} columns={columns} />
        </Card>
      </Space>
    </div>
  )
}

export default ReleasesTable
