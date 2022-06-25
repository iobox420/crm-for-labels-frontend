import React from 'react'
import { Card, Space } from 'antd'
import Loading from '@/components/Loading'
import ArtistService from '@/services/ArtistService'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { IArtist } from '@/models/IArtist'
import IError from '@/models/response/IError'
import Error from '@/components/Error'

const MyContract = () => {
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
        <Card title={`ЛИЦЕНЗИОННЫЙ ДОГОВОР № ${data?.data.contract_number}`} size="default">
          <p>
            contract agreement: <b>{data?.data.contract_agreement}</b>{' '}
          </p>
          <p>contract fee: {data?.data.contract_fee}</p>
          <p>contract fee_in_words: {data?.data.contract_fee_in_words}</p>
          <p>contract expiration_date: {data?.data.contract_expiration_date}</p>
        </Card>
      </Space>
    </div>
  )
}

export default MyContract
