import React from 'react'
import TableEditable from './TableEditable'
import { Button, Card, Space } from 'antd'
import { IAct } from '@/models/IAct'
import { QueryClient, useMutation } from 'react-query'
import AdminService from '@/services/AdminService'
import { useAppSelector } from '@/redux/hooks'
import { Irq } from '@/redux/reactQuerySlice'

interface IActsTable {
  acts: IAct[]
}

const ActsTable: React.FC<IActsTable> = ({ acts }) => {
  const columns = Object.keys(acts[0]).map(key => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    }
  })

  const rq = useAppSelector(({ rq }) => rq)
  console.log('rq',rq);



  const postAct = async (newAct: any) => {
    await AdminService.postAct(newAct)
  }

  const queryClient = new QueryClient()

  const mutation = useMutation(postAct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin/get-about-artist')
    },
  })
  const handleAdd = () => {
    debugger
    mutation.mutate({
      fk_id_artist_contract:rq.selectedArtist.id_artist_contract
    })
  }
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
        <Card title={'Acts'} size="default">
          <TableEditable data={acts} columns={columns} />
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a row
          </Button>
        </Card>
      </Space>
    </div>
  )
}

export default ActsTable
