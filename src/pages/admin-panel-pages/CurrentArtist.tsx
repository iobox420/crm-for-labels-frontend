import React from 'react'
import {  useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/processes/models/response/IError'
import AdminService from '@/processes/services/AdminService'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { ICurrentArtist } from '@/processes/models/response/ICurrentArtist'
import About from '@/features/About'
import { IArtist } from '@/processes/models/IArtist'
import MyContract from '@/features/MyContract'
import TracksTable from "@/features/TracksTable";
import ActsTable from "@/features/ActsTable";
import AlbumsTable from "@/features/AlbumsTable";
import ReleasesTable from "@/features/ReleasesTable";
import VideoclipsTable from "@/features/VideoclipsTable";
import { useAppDispatch } from "@/processes/redux/hooks";
import {setSelectedArtist,setSelectedArtistId} from '@/processes/redux/reactQuerySlice'

const CurrentArtist: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  dispatch(setSelectedArtistId(id));
  const useAboutArtist = () => {
    return useQuery<AxiosResponse<ICurrentArtist>, AxiosError<IError>>(
      'admin/get-about-artist',
      () => AdminService.getAboutArtist({ id_artist_contract: id }),
    )
  }
  const { isLoading, error, data } = useAboutArtist()
  if (isLoading) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />
  dispatch(setSelectedArtist(data?.data));

  return (
    <div>
      <About artist={data?.data as IArtist} />
      <MyContract artist={data?.data as IArtist} />
      <ActsTable />
      <ReleasesTable/>
      <AlbumsTable />
      <TracksTable />
      <VideoclipsTable />
    </div>
  )
}

export default CurrentArtist
