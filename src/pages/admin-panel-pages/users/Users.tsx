import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import TableEditablev from '@/shared/TableEditable'
import { Form } from 'antd'
import getColumnsUsers from '@/pages/admin-panel-pages/users/getColumnsUsers'
import Error from '@/widgets/Error'
import { IUserFull } from "@/processes/models/IUser";

const Users: React.FC = () => {
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)
  function useArtists() {
    return useQuery(
      ['admin/get-users', page],
      () => AdminService.getUsers({ page: page, limit: pageSize }),
      { keepPreviousData: true },
    )
  }
  const mutation = useMutation(AdminService.updateUser, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-users'),
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
  // Как здесь указать тип ошибки я не могу понять.
  // TS2339: Property 'response' does not exist on type '{}'.
  if (error) {
    if (error instanceof Error) {
      return <Error message={error.response?.data?.message!} />
    }
  }
  // TS2571: Object is of type 'unknown'.
 /* if (error) {
    return <Error message={error.response?.data?.message!} />
  }*/
  const columns = getColumnsUsers(edKey, edit, cancel, save)

  if (data) {
    if (data.count !== 0)
      return (
        <div>
          <Form form={form} component={false}>
            <TableEditablev<IUserFull>
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

export default Users
