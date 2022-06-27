import { useQuery } from 'react-query'
import ArtistService from '@/processes/services/ArtistService'
import React from 'react'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { IArtist } from '@/processes/models/IArtist'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/processes/models/response/IError'
import About from '@/features/About'

const AboutPage: React.FC = () => {
  const useAboutMe = () => {
    return useQuery<AxiosResponse<IArtist>, AxiosError<IError>>('artist/getAboutMe', () =>
      ArtistService.getAboutMe(),
    )
  }

  const { isLoading, error, data } = useAboutMe()

  if (isLoading) return <Loading />

  if (error) return <Error message={error?.response?.data?.message!} />

  return (
    <About artist={data?.data as IArtist} />
  )
}
export default AboutPage
