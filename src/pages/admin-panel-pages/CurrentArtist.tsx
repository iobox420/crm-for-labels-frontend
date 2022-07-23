import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useQuery } from 'react-query'
import { getAboutArtist } from '@/processes/services/AdminService'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import About from '@/features/About'
import MyContract from '@/features/MyContract'
import ActsTable from '@/features/ActsTable'

const CurrentArtist: React.FC = () => {
  const { id } = useParams()
  const { isLoading, error, data } = useQuery('admin/get-about-artist', () =>
    getAboutArtist({ id_artist_contract: id }),
  )
  if (isLoading) return <Loading />
  if (error) return <Error />
  return (
    <div>
      <About artist={data?.data} />
      <MyContract artist={data?.data} />
      <ActsTable id={id} />
    </div>
  )
}

export default CurrentArtist
