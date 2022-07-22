import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getAboutArtist } from '@/processes/services/AdminService'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import About from '@/features/About'
import { IArtist } from '@/processes/models/IArtist'
import MyContract from '@/features/MyContract'
import ActsTable from '@/features/ActsTable'
import { useAppDispatch } from '@/processes/redux/hooks'
import { setSelectedArtist, setSelectedArtistId } from '@/processes/redux/reactQuerySlice'

const CurrentArtist: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  dispatch(setSelectedArtistId(id))

  const { isLoading, error, data } = useQuery('admin/get-about-artist', () =>
    getAboutArtist({ id_artist_contract: id }),
  )
  if (isLoading) return <Loading />
  if (error) return <Error />
  dispatch(setSelectedArtist(data?.data))

  return (
    <div>
      <About artist={data?.data as IArtist} />
      <MyContract artist={data?.data as IArtist} />
      <ActsTable />
    </div>
  )
}

export default CurrentArtist
