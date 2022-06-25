import { useQuery } from 'react-query'
import ArtistService from '@/services/ArtistService'
import React from 'react'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { Card, Space, Typography } from 'antd'
import { IArtist } from '@/models/IArtist'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/models/response/IError'

const { Title } = Typography
const AboutReactQuery: React.FC = () => {
  const useAboutMe = () => {
    return useQuery<AxiosResponse<IArtist>, AxiosError<IError>>('artist/getAboutMe', () =>
      ArtistService.getAboutMe(),
    )
  }
  const { isLoading, error, data } = useAboutMe()

  if (isLoading) return <Loading />

  if (error) return <Error message={error?.response?.data?.message!} />

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={data?.data.creative_pseudonym} size="default">
          <Title level={5}>
            {data?.data.surname} {data?.data.name} {data?.data.patronymic}
          </Title>
          <p>
            email: <b>{data?.data.email}</b>
          </p>
          <p>document: {data?.data.document}</p>
          <p>address: {data?.data.address}</p>
          <p>inn: {data?.data.inn}</p>
          <p>snils: {data?.data.snils}</p>
        </Card>
      </Space>
    </div>
  )
}
export default AboutReactQuery
