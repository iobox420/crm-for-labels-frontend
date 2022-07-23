import React, { useState } from 'react'
import { Card, Form, Space, Table } from 'antd'
import { useMutation, useQuery } from 'react-query'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import AddRowButton from '@/shared/AddRowButton'
import getColumnsActs from '@/features/getColumnsActs'
import EditableCell from '@/shared/EditableCell'
import { createAct, deleteAct, getActs, updateAct } from '@/processes/services/ActService'

interface ICurrentArtistTables {
  id: string | undefined
}

const ActsTable: React.FC<ICurrentArtistTables> = ({ id }) => {
  console.log(id)

  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)

  const putActMut = useMutation(updateAct, {
    onSuccess: () => queryClient.invalidateQueries('get-acts'),
  })
  const postActMut = useMutation(createAct, {
    onSuccess: () => queryClient.invalidateQueries('get-acts'),
  })
  const deleteActMut = useMutation(deleteAct, {
    onSuccess: () => queryClient.invalidateQueries('get-acts'),
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

    putActMut.mutate(act)
    setEdKey(null)
  }

  async function deletef() {
    const act = await form.validateFields()

    deleteActMut.mutate(act)
    setEdKey(null)
  }

  const handleAdd = () => {
    postActMut.mutate({
      fk_id_artist_contract: id!,
    })
  }

  const { isLoading, isIdle, error, data } = useQuery(
    ['get-acts', page, pageSize],
    () =>
      getActs({
        page: page,
        limit: pageSize,
        fk_id_artist_contract: id!,
      }),
    { keepPreviousData: true },
  )
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
