import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { IArtist } from '@/processes/models/IArtist'

export default class ArtistService {
  static async getAboutMe(): Promise<AxiosResponse<IArtist>> {
    return $api.get('/artist/about-me', {})
  }
}
