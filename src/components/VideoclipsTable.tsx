import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space } from 'antd'
import { IVideoclip } from '@/models/IVideoclip'

interface IAlbumsTable {
  videoclips: IVideoclip[]
}

const VideoclipsTable: React.FC<IAlbumsTable> = ({ videoclips }) => {
  const columns = Object.keys(videoclips[0]).map(key => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    }
  })
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={'Videoclips'} size="default">
          <TableEditable data={videoclips} columns={columns} />
        </Card>
      </Space>
    </div>
  )
}

export default VideoclipsTable
