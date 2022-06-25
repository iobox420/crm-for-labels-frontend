import React from 'react'
import { Card, Space } from 'antd'
import { IArtist } from '@/models/IArtist'
import About from '@/components/About'

interface IMyContractPage {
  artist:IArtist
}
const MyContract: React.FC<IMyContractPage> = ({ artist }) => {
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={`ЛИЦЕНЗИОННЫЙ ДОГОВОР № ${artist.contract_number}`} size="default">
          <p>
            contract agreement: <b>{artist.contract_agreement}</b>{' '}
          </p>
          <p>contract fee: {artist.contract_fee}</p>
          <p>contract fee_in_words: {artist.contract_fee_in_words}</p>
          <p>contract expiration_date: {artist.contract_expiration_date}</p>
        </Card>
      </Space>
  </div>
)
}

export default MyContract
