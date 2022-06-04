import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'

export default class ArtistService {
  static async getAboutMe(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/about-me', {})
  }
}
