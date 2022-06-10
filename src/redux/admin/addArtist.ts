import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuth } from '@/redux/authSlice'

export const addArtist = createAsyncThunk(
  'admin/addArtist',
  async (row, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      // @ts-ignore
      const response = await AdminService.addArtist(row)
      console.log('Артисты успешно добавлен')
      return fulfillWithValue(response.data)
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(setAuth(false))
      }
      return rejectWithValue('Не удалось добавить артиста')
    }
  },
)
