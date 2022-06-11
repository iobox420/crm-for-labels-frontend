import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'
import { IArtist } from '@/models/IArtist'

export default class AdminService {
  // artists
  static async getArtists(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/admin/get-artists', {})
  }
  static async updateArtist(artist:IArtist): Promise<AxiosResponse<AuthResponse>> {
    return $api.put<AuthResponse>('/admin/put-artist', {...artist})
  }
  static async addArtist(artist:IArtist): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/admin/post-artist', {...artist})
  }
  // users
  static async getUsers(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/admin/get-users', {})
  }
}
