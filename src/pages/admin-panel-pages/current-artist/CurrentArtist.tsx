import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/models/response/IError'
import AdminService from '@/services/AdminService'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { ICurrentArtist } from '@/models/response/ICurrentArtist'
import About from '@/components/About'
import { IArtist } from '@/models/IArtist'
import MyContract from '@/components/MyContract'
import TracksTable from "@/components/TracksTable";
import { ITrack } from '@/models/ITrack'
import ActsTable from "@/components/ActsTable";
import { IAct } from '@/models/IAct'
import AlbumsTable from "@/components/AlbumsTable";
import { IAlbum } from '@/models/IAlbum'
import ReleasesTable from "@/components/ReleasesTable";
import { IRelease } from '@/models/IRelease'
import { IVideoclip } from '@/models/IVideoclip'
import VideoclipsTable from "@/components/VideoclipsTable";
import { useAppDispatch } from "@/redux/hooks";
import {setSelectedArtist} from '@/redux/reactQuerySlice'

const CurrentArtist: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
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
      <ActsTable acts={data?.data.acts as IAct[]}/>
      <ReleasesTable releases={data?.data.releases as IRelease[]}/>
      <TracksTable tracks={data?.data.tracks as ITrack[]}/>
      <VideoclipsTable videoclips={data?.data.videoclips as IVideoclip[]}/>
      <AlbumsTable albums={data?.data.albums as IAlbum[]}/>

    </div>
  )
}

export default CurrentArtist
