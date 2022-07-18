import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import { Form, Table } from 'antd'
import EditableCell from '@/shared/EditableCell'
import getColumnsTracks from '@/pages/admin-panel-pages/tracks/getColumnsTracks'
import AddRowButton from '@/shared/AddRowButton'

const Tracks: React.FC = () => {
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)

  function useArtists() {
    return useQuery(
      ['admin/get-artists', page],
      () => AdminService.getAllTracks({ page: page, limit: pageSize }),
      { keepPreviousData: true },
    )
  }

  const mutation = useMutation(AdminService.track, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-artists'),
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
    const track = await form.validateFields()
    form.resetFields()
    console.log(track)
    mutation.mutate({
      type: 'put',
      payload: track,
    })
    setEdKey(null)
  }

  async function deletef() {
    const track = await form.validateFields()
    console.log(track)
    mutation.mutate({
      type: 'delete',
      payload: track,
    })
    setEdKey(null)
  }

  const handleAdd = () => {
    mutation.mutate({
      type: 'post',
      payload: {},
    })
  }

  const { isLoading, error, data } = useArtists()

  if (isLoading) return <Loading />

  if (error) return <Error />

  const columns = getColumnsTracks(edKey, edit, cancel, save, deletef)
  if (data) {
    if (data.count !== 0)
      return (
        <div>
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
            <AddRowButton handle={handleAdd} label={'Add tracks'} />
          </Form>
        </div>
      )
  }
  return (
    <div>
      <NothingData />
    </div>
  )
}

export default Tracks
