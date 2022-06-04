import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export default class AdminService {
  static async getArtists(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/get-artists', {})
  }
}
