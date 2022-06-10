import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'

export default class AdminService {
  static async getArtists(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/admin/get-artists', {})
  }
  static async updateArtist(artist:any): Promise<AxiosResponse<AuthResponse>> {
    return $api.put<AuthResponse>('/admin/put-artist', {...artist})
  }
}
