import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'
import { IArtist } from '@/models/IArtist'
import { IUserFull } from '@/models/IUser'
import { getResCountRows } from '@/models/response/getResCountRows'
import { PageLimit } from '@/models/PageLimit'
import { IAct } from '@/models/IAct'

export default class AdminService {
  static async getArtists(
    props: PageLimit,
  ): Promise<AxiosResponse<getResCountRows<IArtist>, PageLimit>>{
    return $api.post<getResCountRows<IArtist>>('/admin/get-artists', props)
  }

  static async updateArtist(artist: IArtist): Promise<AxiosResponse<AuthResponse>> {
    return $api.put<AuthResponse>('/admin/put-artist', { ...artist })
  }

  static async addArtist(artist: IArtist): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/admin/post-artist', { ...artist })
  }

  static async getUsers(
    props: PageLimit,
  ): Promise<AxiosResponse<getResCountRows<IUserFull>, PageLimit>> {
    return $api.post<getResCountRows<IUserFull>>('/admin/get-users', props)
  }

  static async updateUser(user: IUserFull): Promise<AxiosResponse<AuthResponse>> {
    return $api.put<AuthResponse>('/admin/put-user', { ...user })
  }

  static async getAboutArtist(prop: {
    id_artist_contract:string | undefined
  }): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/admin/get-about-artist', prop)
  }

  static async postAct(act:IAct) {
    return $api.post<AxiosResponse>('admin/post-act',act)
  }
}
