import React from 'react'
import { Card, Space, Table } from 'antd'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { useAppSelector } from '@/processes/redux/hooks'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'

const ReleasesTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)

  const postTrack = async (newRelease: any) => {
    await AdminService.postRelease(newRelease)
  }

  const mutation = useMutation(postTrack, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-releases'),
  })
  const handleAdd = () => {
    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }

  const { isLoading, error, data } = useQuery('admin/get-releases', () =>
    AdminService.getReleases({ fk_id_artist_contract: rq.selectedArtistId }),
  )
  if (isLoading) return <Loading />
  if (error) return <Error />

  const notNothing = data?.data.length !== 0
  if (notNothing) {
    const releases = data!.data
    const columns = Object.keys(releases[0]).map(key => {
      return {
        title: key,
        dataIndex: key,
        key: key,
      }
    })

    return (
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
          <Card title={'Releases'} size="default">
            <Table
              dataSource={releases}
              columns={columns}
              pagination={{
                pageSize: 10,
              }}
            />
            <AddRowButton handle={handleAdd} label={'Add release'} />
          </Card>
        </Space>
      </div>
    )
  }

  return (
    <div>
      <AddRowButton handle={handleAdd} label={'Add release'} />
      <NothingData />
    </div>
  )
}

export default ReleasesTable
