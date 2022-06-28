import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/processes/models/response/AuthResponse'
import { IArtist } from '@/processes/models/IArtist'
import { IUserFull } from '@/processes/models/IUser'
import { getResCountRows } from '@/processes/models/response/getResCountRows'
import { PageLimit } from '@/processes/models/PageLimit'
import { IAct } from '@/processes/models/IAct'
import { IAlbum } from '@/processes/models/IAlbum'
import { IRelease } from '@/processes/models/IRelease'
import { ITrack } from '@/processes/models/ITrack'
import { IVideoclip } from '@/processes/models/IVideoclip'
import { IFkArtistContract } from '@/processes/models/response/IFkArtistContract'

export default class AdminService {
  static async getArtists(props: PageLimit) {
    return $api.post<AxiosResponse<getResCountRows<IArtist[]>>>('/admin/get-artists', props)
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
    id_artist_contract: string | undefined
  }): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/admin/get-about-artist', prop)
  }

  /*
   post routes
   */
  static async postAct(act: IAct) {
    return $api.post<AxiosResponse>('admin/post-act', act)
  }

  static async postTrack(track: ITrack) {
    return $api.post<AxiosResponse>('admin/post-track', track)
  }

  static async postAlbum(album: IAlbum) {
    return $api.post<AxiosResponse>('admin/post-album', album)
  }

  static async postRelease(release: IRelease) {
    return $api.post<AxiosResponse>('admin/post-release', release)
  }

  static async postVideoclip(videoclip: IVideoclip) {
    return $api.post<AxiosResponse>('admin/post-videoclip', videoclip)
  }

  /*
  get routes
  */
  static async getActs(prop: IFkArtistContract): Promise<AxiosResponse> {
    return $api.post<AxiosResponse<IAct[]>>('/admin/get-acts', prop)
  }

  static async getAlbums(prop: IFkArtistContract): Promise<AxiosResponse> {
    return $api.post<AxiosResponse<IAlbum[]>>('/admin/get-albums', prop)
  }

  static async getReleases(prop: IFkArtistContract): Promise<AxiosResponse> {
    return $api.post<AxiosResponse<IRelease[]>>('/admin/get-releases', prop)
  }

  static async getTracks(prop: IFkArtistContract): Promise<AxiosResponse> {
    return $api.post<AxiosResponse<ITrack[]>>('/admin/get-tracks', prop)
  }

  static async getVideoclips(prop: IFkArtistContract): Promise<AxiosResponse> {
    return $api.post<AxiosResponse<IVideoclip[]>>('/admin/get-videoclips', prop)
  }
}
