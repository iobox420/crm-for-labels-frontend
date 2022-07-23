import { IAct } from '@/processes/models/IAct'
import $api from '@/processes/http/api'
import castedToTypes from '@/shared/castedToTypes'
import { PageLimitWithIdArtist } from '@/processes/models/PageLimit'
import moment from 'moment'
import addKey from '@/shared/addKey'

interface IIdArtist {
  fk_id_artist_contract: string | number
}

export async function getActs(props: PageLimitWithIdArtist) {
  const data = await $api.get('/admin/get-acts', {
    params: props,
  })
  const rows = addKey(data.data.rows)
  const rowsCastDateFields = rows.map((act: IAct) => {
    return {
      ...act,
      createdAt: moment(act.createdAt),
      updatedAt: moment(act.updatedAt),
    }
  })
  const result = { count: data.data.count, rows: rowsCastDateFields }
  return result
}

export async function createAct(id: IIdArtist) {
  return $api.post('admin/post-act', id)
}

export async function updateAct(payload: IAct) {
  const casted = castedToTypes(payload)
  return $api.put('admin/put-act', casted)
}

export async function deleteAct(act: IAct) {
  const casted = castedToTypes(act)

  return $api.delete('admin/delete-act', { data: casted })
}
