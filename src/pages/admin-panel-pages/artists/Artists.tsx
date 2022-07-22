import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AdminService, { getArtists, updateArtist } from "@/processes/services/AdminService";
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import getColumnsArtists from '@/pages/admin-panel-pages/artists/getColumnsArtists'
import { Form, Table } from 'antd'
import EditableCell from '@/shared/EditableCell'

const Artists: React.FC = () => {
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)
  function useArtists() {
    return useQuery(
      ['admin/get-artists', page],
      () => getArtists({ page: page, limit: pageSize }),
      { keepPreviousData: true },
    )
  }
  const mutation = useMutation(updateArtist, {
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
    const artist = await form.validateFields()
    mutation.mutate(artist)
    setEdKey(null)
  }
  const { isLoading, error, data } = useArtists()

  if (isLoading) return <Loading />

  if (error) return <Error />

  const columns = getColumnsArtists(edKey, edit, cancel, save)
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

export default Artists
