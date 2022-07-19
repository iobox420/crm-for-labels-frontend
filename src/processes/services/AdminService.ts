import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '@/processes/models/response/AuthResponse'
import { IArtist } from '@/processes/models/IArtist'
import { IUserFull } from '@/processes/models/IUser'
import { PageLimit, PageLimitWithIdArtist } from "@/processes/models/PageLimit";
import { IAct } from '@/processes/models/IAct'
import { IAlbum } from '@/processes/models/IAlbum'
import { IRelease } from '@/processes/models/IRelease'
import { ITrack, ITrackWithFiles } from "@/processes/models/ITrack";
import { IVideoclip } from '@/processes/models/IVideoclip'
import { IFkArtistContract } from '@/processes/models/response/IFkArtistContract'
import moment from 'moment'
import { IActionCreator } from '../models/IActionCreator'
import { getResCountRows } from '../models/response/getResCountRows'

function addKey(data: any) {
  const dataWithKey = data.map((row: any, i: any) => {
    return {
      key: i,
      ...row,
    }
  })
  return dataWithKey
}

function castedToTypes(payload:any) {
  const resultPayload = { ...payload }
  for (let prop in payload) {
    if (payload[prop] instanceof moment) {
      resultPayload[prop] = payload[prop].format('YYYY-MM-DD')
    }
  }
  return resultPayload
}

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

  static async getAllTracks(props: PageLimit) {
    const tracks = await $api.get('/admin/get-all-tracks', { params: props })
    const rows = tracks?.data.rows.map((track: ITrack, i: number) => {
      return {
        ...track,
        date_of_registration: moment(track.date_of_registration),
        createdAt: moment(track.createdAt),
        updatedAt: moment(track.updatedAt),
        key: i,
      }
    })
    return {
      rows: rows,
      count: tracks.data.count,
    }
  }

  static async getAboutArtist(prop: {
    id_artist_contract: string | undefined
  }): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/admin/get-about-artist', prop)
  }

  /*
   post routes

   */
  static async track(action: IActionCreator<ITrackWithFiles>) {
    if (action.type === 'post') {
      return $api.post<AxiosResponse>('admin/post-track')
    }
    if (action.type === 'put') {
      const casted = castedToTypes(action.payload)
      const track = {
        ...casted,
        upload: null,
      }
      let data = new FormData()
      console.log(action.payload);
      if(action.payload.path_to_wav){
        if(action.payload.path_to_wav[0].originFileObj instanceof File){
          data.append('path_to_wav', action.payload.path_to_wav[0].originFileObj);
          console.log('add path_to_wav');
        }
      }
      if(action.payload.path_to_mp3){
        if(action.payload.path_to_mp3[0].originFileObj instanceof File){
          data.append('path_to_mp3', action.payload.path_to_mp3[0].originFileObj);
          console.log('add path_to_mp3');
        }
      }
      if(action.payload.path_to_cover){
        if(action.payload.path_to_cover[0].originFileObj instanceof File){
          data.append('path_to_cover', action.payload.path_to_cover[0].originFileObj);
          console.log('add path_to_cover');
        }
      }

      for (let prop in track){
        data.append(prop,track[prop])
      }
      console.log(data);
      console.log(JSON.stringify(data));
      return $api.put('admin/put-track', data)
    }
    if (action.type === 'delete') {
      const casted = castedToTypes(action.payload)
      console.log(casted)
      return $api.delete('admin/delete-track', { data: casted })
    }
  }

  static async act(action: IActionCreator<IAct>) {
    if (action.type === 'post') {
      return $api.post('admin/post-act', action.payload)
    }
    if (action.type === 'put') {
      const casted = castedToTypes(action.payload)
      return $api.put('admin/put-act', casted)
    }
    if (action.type === 'delete') {
      const casted = castedToTypes(action.payload)
      console.log(casted)
      return $api.delete('admin/delete-act', { data: casted })
    }
  }

  static async postTrack(track: ITrack) {
    return $api.post('admin/post-track', track)
  }

  static async postAlbum(album: IAlbum) {
    return $api.post('admin/post-album', album)
  }

  static async postRelease(release: IRelease) {
    return $api.post('admin/post-release', release)
  }

  static async postVideoclip(videoclip: IVideoclip) {
    return $api.post('admin/post-videoclip', videoclip)
  }

  /*
  get routes
  */
  static async getActs(props:PageLimitWithIdArtist) {
    const data = await $api.get<getResCountRows<IAct[]>>('/admin/get-acts', {
      params: props,
    })
    const rows = addKey(data.data.rows)
    const rowsCastDateFields = rows.map((act:IAct )=> {
      return {
        ...act,
        createdAt: moment(act.createdAt),
        updatedAt: moment(act.updatedAt),
      }
    })
    const result = { count: data.data.count, rows: rowsCastDateFields }
    return result
  }

  static async getAlbums(prop: IFkArtistContract) {
    return $api.post<IAlbum[]>('/admin/get-albums', prop)
  }

  static async getReleases(prop: IFkArtistContract) {
    return $api.post<IRelease[]>('/admin/get-releases', prop)
  }

  static async getTracks(prop: IFkArtistContract) {
    return $api.post<ITrack[]>('/admin/get-tracks', prop)
  }

  static async getVideoclips(prop: IFkArtistContract) {
    return $api.post<IVideoclip[]>('/admin/get-videoclips', prop)
  }
}
