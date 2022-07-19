import { IAct } from '@/processes/models/IAct'
import $api from '@/processes/http/api'
import castedToTypes from '@/shared/castedToTypes'

interface IIdArtist {
  fk_id_artist_contract: string | number
}

class ActService {
  static async postAct(id:IIdArtist) {
    return $api.post('admin/post-act', id)
  }
  static async putAct(payload: IAct) {
    const casted = castedToTypes(payload)
    return $api.put('admin/put-act', casted)
  }
  static async deletAct(act: IAct) {
    const casted = castedToTypes(act)
    console.log(casted)
    return $api.delete('admin/delete-act', { data: casted })
  }
}
export default ActService
