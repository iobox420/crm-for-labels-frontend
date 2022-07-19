import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space, Table } from "antd";
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { useAppSelector } from '@/processes/redux/hooks'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'

const AlbumsTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)

  const postTrack = async (newAlbum: any) => {
    await AdminService.postAlbum(newAlbum)
  }

  const mutation = useMutation(postTrack, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-albums'),
  })
  const handleAdd = () => {
    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }

  const { isLoading, error, data } = useQuery('admin/get-albums', () =>
    AdminService.getAlbums({ fk_id_artist_contract: rq.selectedArtistId }),
  )
  if (isLoading) return <Loading />
  if (error) return <Error />

  const notNothing = data?.data.length !== 0
  if (notNothing) {
    const albums = data!.data
    const columns = Object.keys(albums[0]).map(key => {
      return {
        title: key,
        dataIndex: key,
        key: key,
      }
    })
    return (
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
          <Card title={'Albums'} size="default">
            <Table dataSource={albums} columns={columns} pagination={{
              pageSize: 10,
            }} />
            <AddRowButton handle={handleAdd} label={'Add album'} />
          </Card>
        </Space>
      </div>
    )
  }

  return (
    <div>
      <AddRowButton handle={handleAdd} label={'Add album'} />
      <NothingData />
    </div>
  )
}

export default AlbumsTable
