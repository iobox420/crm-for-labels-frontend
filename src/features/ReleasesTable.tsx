import React from 'react'
import TableEditable from './TableEditable'
import { Button, Card, Space } from 'antd'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { useAppSelector } from '@/processes/redux/hooks'
import { AxiosError, AxiosResponse } from 'axios'
import IError from '@/processes/models/response/IError'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import { IRelease } from '@/processes/models/IRelease'
import NothingData from "@/widgets/NothingData";
import AddRowButton from "@/shared/AddRowButton";

const ReleasesTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const useReleases = () => {
    return useQuery<AxiosResponse<IRelease[]>, AxiosError<IError>>('admin/get-releases', () =>
      AdminService.getReleases({ fk_id_artist_contract: rq.selectedArtistId }),
    )
  }

  const postTrack = async (newRelease: any) => {
    await AdminService.postRelease(newRelease)
  }

  const mutation = useMutation(postTrack, {
    onSuccess: () => {
      // noinspection JSIgnoredPromiseFromCall
      queryClient.invalidateQueries('admin/get-releases')
    },
  })
  const handleAdd = () => {

    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }

  const { isLoading, error, data } = useReleases()
  const nothing = data?.data.length === 0;
  if (nothing)
    return (
      <div>
        <AddRowButton handle={handleAdd} label={'Add release'} />
        <NothingData />
      </div>
    )
  if (isLoading) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />
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
          <TableEditable data={releases} columns={columns} />
          <AddRowButton handle={handleAdd} label={'Add release'} />
        </Card>
      </Space>
    </div>
  )
}

export default ReleasesTable
