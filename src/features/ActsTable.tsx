import React from 'react'
import TableEditable from './TableEditable'
import { Card, Space } from 'antd'
import { IAct } from '@/processes/models/IAct'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { useAppSelector } from '@/processes/redux/hooks'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/processes/models/response/IError'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'

const ActsTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const useActs = () => {
    return useQuery<AxiosResponse<IAct[]>, AxiosError<IError>>('admin/get-acts', () =>
      AdminService.getActs({ fk_id_artist_contract: rq.selectedArtistId }),
    )
  }

  const postAct = async (newAct: any) => {
    await AdminService.postAct(newAct)
  }

  const mutation = useMutation(postAct, {
    onSuccess: () => {
      // noinspection JSIgnoredPromiseFromCall
      queryClient.invalidateQueries('admin/get-acts')
    },
  })
  const handleAdd = () => {
    debugger
    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }

  const { isLoading, error, data } = useActs()
  const nothing = data?.data.length === 0
  if (nothing)
    return (
      <div>
        <AddRowButton handle={handleAdd} label={'Add act'} />
        <NothingData />
      </div>
    )
  if (isLoading) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />
  const acts = data!.data
  const columns = Object.keys(acts[0]).map(key => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    }
  })
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={'Acts'} size="default">
          <TableEditable data={acts} columns={columns} />
          <AddRowButton handle={handleAdd} label={'Add act'} />
        </Card>
      </Space>
    </div>
  )
}

export default ActsTable
