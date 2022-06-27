import React from 'react'
import Loading from '@/widgets/Loading'
import ArtistService from '@/processes/services/ArtistService'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { IArtist } from '@/processes/models/IArtist'
import IError from '@/processes/models/response/IError'
import Error from '@/widgets/Error'
import MyContract from '@/features/MyContract'

const MyContractPage = () => {
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
      <MyContract artist={data?.data as IArtist} />
    </div>
  )
}

export default MyContractPage
