import React, { useState } from 'react'
import { useAppSelector } from '@/processes/redux/hooks'
import { useMutation } from 'react-query'
import AdminService from '@/processes/services/AdminService'
import { queryClient } from '@/app/main'
import AddRowButton from '@/shared/AddRowButton'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import Error from '@/widgets/Error'
import useArtists from './UseArtists'
import TableEditablev1 from '@/pages/admin-panel-pages/ArtistsRQ/TableEditableArtists'
import getRows from '@/pages/admin-panel-pages/ArtistsRQ/getRows'
import getColumns from '@/pages/admin-panel-pages/ArtistsRQ/getColumns'
import { Form } from 'antd'

const ArtistsRQ: React.FC = () => {
  const rq = useAppSelector(({ rq }) => rq)
  const [edKey, setEdKey] = useState(null)
  const postAct = async (newAct: any) => {
    await AdminService.postAct(newAct)
  }
  const mutation = useMutation(postAct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin/get-acts')
    },
  })

  const handleAdd = () => {
    mutation.mutate({
      fk_id_artist_contract: rq.selectedArtistId,
    })
  }
  const [form] = Form.useForm()

  function edit(record) {
    setEdKey(record.key)

    form.setFieldsValue({
      ...record,
    })
    console.log('edit')
  }
  function cancel() {
    setEdKey(null)
  }
  async function save() {
    const artist = await form.validateFields()
    console.log(artist)
  }
  const { isLoading, error, data } = useArtists()
  if (isLoading) return <Loading />
  if (error) return <Error message={error?.response?.data?.message!} />

  if (data) {
    if (data.count === 0)
      return (
        <div>
          <AddRowButton handle={handleAdd} label={'Add artist'} />
          <NothingData />
        </div>
      )
  }

  const columns = getColumns(data[0], edKey, setEdKey, edit, cancel, save)

  const rows = getRows(data, edKey, columns)
  return (
    <div>
      <Form form={form} component={false}>
        <TableEditablev1 data={rows} columns={columns} />
      </Form>
      <AddRowButton handle={handleAdd} label={'Add act'} />
    </div>
  )
}

export default ArtistsRQ
