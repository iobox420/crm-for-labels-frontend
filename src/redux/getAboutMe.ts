import { setArtists } from '@/redux/adminSlice'
import ArtistService from '@/services/ArtistService'
import { setAboutMe } from '@/redux/artistSlice'

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
