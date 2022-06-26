import React from 'react'
import { Card, Space, Typography } from 'antd'
import { IArtist } from '@/processes/models/IArtist'
const { Title } = Typography
interface IAboutPage {
  artist:IArtist
}
const About: React.FC<IAboutPage> = ({ artist }) => {
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={artist.creative_pseudonym} size="default">
          <Title level={5}>
            {artist.surname} {artist.name} {artist.patronymic}
          </Title>
          <p>
            email: <b>{artist.email}</b>
          </p>
          <p>document: {artist.document}</p>
          <p>address: {artist.address}</p>
          <p>inn: {artist.inn}</p>
          <p>snils: {artist.snils}</p>
        </Card>
      </Space>
    </div>
  )
}

export default About
