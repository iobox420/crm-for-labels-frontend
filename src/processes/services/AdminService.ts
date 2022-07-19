import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/processes/models/response/AuthResponse'
import { IArtist } from '@/processes/models/IArtist'
import { IUserFull } from '@/processes/models/IUser'
import { PageLimit } from '@/processes/models/PageLimit'
import moment from 'moment'

export default class AdminService {
  static async getArtists(props: PageLimit) {
    const artists = await $api.get('/admin/get-artists', { params: props })
    const rows = artists?.data.rows.map((artist: IArtist, i: number) => {
      return {
        ...artist,
        contract_agreement: moment(artist.contract_agreement),
        contract_expiration_date: moment(artist.contract_expiration_date),
        key: i,
      }
    })
    return {
      rows: rows,
      count: artists.data.count,
    }
  }

  static async updateArtist(artist: IArtist) {
    return $api.put<AuthResponse>('/admin/put-artist', { ...artist })
  }

  static async addArtist(artist: IArtist) {
    return $api.post<AuthResponse>('/admin/post-artist', { ...artist })
  }

  static async getUsers(props: PageLimit) {
    const data = await $api.get('/admin/get-users', { params: props })
    const rows = data?.data.rows.map((user: IUserFull, i: number) => {
   /*   console.log(moment(user.createdAt).format("YYYY-MM-DD"));*/

      return {
        ...user,
        createdAt: moment(user.createdAt),
        updatedAt: moment(user.updatedAt),
        key: i,
      }
    })
    return {
      rows: rows,
      count: data.data.count,
    }
  }

  static async updateUser(user: IUserFull) {
    return $api.put<AuthResponse>('/admin/put-user', { ...user })
  }



  static async getAboutArtist(prop: {
    id_artist_contract: string | undefined
  }): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/admin/get-about-artist', prop)
  }

}
