import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import TableEditablev from '@/shared/TableEditable'
import getColumnsArtists from '@/pages/admin-panel-pages/artists/getColumnsArtists'
import { Form } from 'antd'

const Artists: React.FC = () => {
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)
  function useArtists() {
    return useQuery(
      ['admin/get-artists', page],
      () => AdminService.getArtists({ page: page, limit: pageSize }),
      { keepPreviousData: true },
    )
  }
  const mutation = useMutation(AdminService.updateArtist, {
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

  if (error) return <Error message={error?.response?.data?.message!} />

  const columns = getColumnsArtists(edKey, edit, cancel, save)
  if (data) {
    if (data.count !== 0)
      return (
        <div>
          <Form form={form} component={false}>
            <TableEditablev
              data={data.rows}
              columns={columns}
              count={data.count}
              setPage={setPage}
              pageSize={pageSize}
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
