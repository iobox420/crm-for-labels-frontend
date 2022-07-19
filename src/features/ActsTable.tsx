import React, { useState } from 'react'
import { Card, Form, Space, Table } from 'antd'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { useAppSelector } from '@/processes/redux/hooks'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'
import getColumnsActs from '@/features/getColumnsActs'
import EditableCell from '@/shared/EditableCell'
import ActService from '@/processes/services/ActService'

const ActsTable: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)

  const useActs = () => {
    return useQuery(['admin/get-acts', page], () =>
      AdminService.getActs({
        page: page,
        limit: pageSize,
        fk_id_artist_contract: rq.selectedArtistId!,
      }),
    )
  }

  const putActMut = useMutation(ActService.putAct,{
    onSuccess: () => queryClient.invalidateQueries('admin/get-acts')
  })
  const postActMut = useMutation(ActService.postAct,{
    onSuccess: () => queryClient.invalidateQueries('admin/get-acts')
  })
  const deleteActMut = useMutation(ActService.deletAct,{
    onSuccess: () => queryClient.invalidateQueries('admin/get-acts')
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
    console.log(act)
    putActMut.mutate(act)
    setEdKey(null)
  }
  async function deletef() {
    const act = await form.validateFields()
    console.log(act)
    deleteActMut.mutate(act)
    setEdKey(null)
  }

  const handleAdd = () => {
    postActMut.mutate({
      fk_id_artist_contract: rq.selectedArtistId!,
    })
  }

  const { isLoading, isIdle, error, data } = useActs()
  if (isLoading || isIdle) return <Loading />
  if (error) return <Error />

  if (data && data.count) {
    const columns = getColumnsActs(edKey, edit, cancel, save, deletef)

    return (
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
          <Card title={'Acts'} size="default">
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                dataSource={data.rows}
                columns={columns}
                pagination={{
                  pageSize: pageSize,
                  total: data.count,
                  onChange: page => {
                    setPage(page)
                  },
                }}
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
