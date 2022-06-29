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
import { IVideoclip } from '@/processes/models/IVideoclip'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'

const VideoclipsTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const useVideoclips = () => {
    return useQuery<AxiosResponse<IVideoclip[]>, AxiosError<IError>>('admin/get-videoclips', () =>
      AdminService.getVideoclips({ fk_id_artist_contract: rq.selectedArtistId }),
    )
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

  const { isLoading, error, data } = useVideoclips()
  if (isLoading) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />

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
            <TableEditable data={videoclips} columns={columns} />
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
