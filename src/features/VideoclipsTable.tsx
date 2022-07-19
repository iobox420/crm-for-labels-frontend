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

const VideoclipsTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const useVideoclips = () => {
    return
  }
  const postTrack = async (newVideoclip: any) => {
    await AdminService.postVideoclip(newVideoclip)
  }

  const mutation = useMutation(postTrack, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-videoclips'),
  })
  const handleAdd = () => {
    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }

  const { isLoading, error, data } = useQuery('admin/get-videoclips', () =>
    AdminService.getVideoclips({ fk_id_artist_contract: rq.selectedArtistId }),
  )
  if (isLoading) return <Loading />
  if (error) return <Error />

  const notNothing = data?.data.length !== 0
  if (notNothing) {
    const videoclips = data!.data
    const columns = Object.keys(videoclips[0]).map(key => {
      return {
        title: key,
        dataIndex: key,
        key: key,
      }
    })

    return (
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
          <Card title={'Videoclips'} size="default">
            <Table
              dataSource={videoclips}
              columns={columns}
              pagination={{
                pageSize: 10,
              }}
            />
            <AddRowButton handle={handleAdd} label={'Add videoclip'} />
          </Card>
        </Space>
      </div>
    )
  }

  return (
    <div>
      <AddRowButton handle={handleAdd} label={'Add videoclip'} />
      <NothingData />
    </div>
  )
}

export default VideoclipsTable
