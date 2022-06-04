import AdminService from '@/services/AdminService'
import { setArtists } from '@/redux/adminSlice'

export const getArtists = () => {
  // @ts-ignore
  return async dispatch => {
    console.log('get')
    try {
      console.log('before req')
      const response = await AdminService.getArtists()
      console.log('after req')
      dispatch(setArtists(response.data))
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}
