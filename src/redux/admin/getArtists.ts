import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from "@/models/IUser";
import { setAuth, setUser } from "@/redux/authSlice";

export const getArtists = createAsyncThunk(
  'admin/getArtists',
  async (_, {dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AdminService.getArtists()
      console.log('Артисты успешно загружены')
      return fulfillWithValue(response.data)
      /*return response.data*/
    } catch (e: any) {
      if(e.response.status === 401){
        dispatch(setAuth(false))
/*        dispatch(setUser({} as IUser))*/
      }

      return rejectWithValue('Не удалось загрузить список артистов')
    }
  },
)
