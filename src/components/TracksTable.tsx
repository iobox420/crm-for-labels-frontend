import { ITrack } from '@/models/ITrack'
import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space } from "antd";

interface ITracksTable {
  tracks: ITrack[]
}

const TracksTable: React.FC<ITracksTable> = ({ tracks }) => {

    const columns = Object.keys(tracks[0]).map((key) => {
      return  {
        title: key,
        dataIndex: key,
        key: key,
      }
    })

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={'Tracks'} size="default">
          <TableEditable data={tracks} columns={columns} />
        </Card>
      </Space>
    </div>
  )
}

export default TracksTable
