import React, { useState } from 'react'
import TableEditable from './TableEditable'
import { Card, Form, Space } from 'antd'
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
import TableEditablev from '@/shared/TableEditable'
import getColumnsActs from '@/features/getColumnsActs'

const ActsTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)

  const useActs = () => {
    // @ts-ignore
    return useQuery(['admin/get-acts', page], () =>
      AdminService.getActs({
        page: page,
        limit: pageSize,
        fk_id_artist_contract: rq.selectedArtistId,
      }),
    )
  }

  const mutation = useMutation(AdminService.act, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-acts'),
  })

  const [form] = Form.useForm()

  function edit(record: any) {
    setEdKey(record.key)
    form.setFieldsValue({
      ...record,
    })
  }

  function cancel() {
    setEdKey(null)
  }

  async function save() {
    const act = await form.validateFields()
    console.log(act);
    mutation.mutate({
      type: 'put',
      payload: act,
    })
    setEdKey(null)
  }
  async function deletef(){
    const act = await form.validateFields()
    console.log(act);
    mutation.mutate({
      type: 'delete',
      payload: act,
    })
    setEdKey(null)
  }

  const handleAdd = () => {
    mutation.mutate({
      type: 'post',
      payload: {
        fk_id_artist_contract: rq.selectedArtistId,
      },
    })
  }

  const { isLoading, isIdle, error, data } = useActs()
  if (isLoading || isIdle) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />

  if (data && data.count) {
    const columns = getColumnsActs(edKey, edit, cancel, save,deletef)

    return (
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
          <Card title={'Acts'} size="default">
            <Form form={form} component={false}>
              <TableEditablev
                data={data.rows}
                columns={columns}
                count={data.count}
                setPage={setPage}
                pageSize={pageSize}
              />
              <AddRowButton handle={handleAdd} label={'Add act'} />
            </Form>
          </Card>
        </Space>
      </div>
    )
  }

  return (
    <div>
      <AddRowButton handle={handleAdd} label={'Add act'} />
      <NothingData />
    </div>
  )
}

export default ActsTable
