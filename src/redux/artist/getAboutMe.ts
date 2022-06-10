import { setArtists } from '@/redux/admin/adminSlice'
import ArtistService from '@/services/ArtistService'
import { setAboutMe } from '@/redux/artist/artistSlice'

export const getAboutMe = () => {
  // @ts-ignore
  return async dispatch => {
    try {
      console.log('before getAboutMe')
      const response = await ArtistService.getAboutMe()
      console.log('after getAboutMe')
      console.log(response)
      dispatch(setAboutMe(response.data))
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}