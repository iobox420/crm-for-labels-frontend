import React from 'react'
import Loading from '@/widgets/Loading'
import ArtistService from '@/processes/services/ArtistService'
import { useQuery } from 'react-query'
import { IArtist } from '@/processes/models/IArtist'
import Error from '@/widgets/Error'
import MyContract from '@/features/MyContract'

const MyContractPage = () => {
  const { isLoading, error, data } = useQuery('artist/getAboutMe', () => ArtistService.getAboutMe())
  if (isLoading) return <Loading />

  if (error) return <Error />

  return (
    <div>
      <MyContract artist={data?.data as IArtist} />
    </div>
  )
}

export default MyContractPage
