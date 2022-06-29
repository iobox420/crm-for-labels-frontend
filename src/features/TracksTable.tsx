import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space } from 'antd'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { useAppSelector } from '@/processes/redux/hooks'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/processes/models/response/IError'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import { ITrack } from '@/processes/models/ITrack'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'

const TracksTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const useTracks = () => {
    return useQuery<AxiosResponse<ITrack[]>, AxiosError<IError>>('admin/get-tracks', () =>
      AdminService.getTracks({ fk_id_artist_contract: rq.selectedArtistId }),
    )
  }

  const postTrack = async (newTrack: any) => {
    await AdminService.postTrack(newTrack)
  }

  const mutation = useMutation(postTrack, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-tracks'),
  })
  const handleAdd = () => {
    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }
  const { isLoading, error, data } = useTracks()
  if (isLoading) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />
  const notNothing = data?.data.length !== 0
  if (notNothing) {
    const tracks = data!.data
    const columns = Object.keys(tracks[0]).map(key => {
      return {
        title: key,
        dataIndex: key,
        key: key,
      }
    })

    return (
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
          <Card title={'Tracks'} size="default">
            <TableEditable data={tracks} columns={columns} />
            <AddRowButton handle={handleAdd} label={'Add track'} />
          </Card>
        </Space>
      </div>
    )
  }

  return (
    <div>
      <AddRowButton handle={handleAdd} label={'Add track'} />
      <NothingData />
    </div>
  )
}

export default TracksTable
