import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuth } from '@/redux/authSlice'

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AdminService.getUsers()
      console.log('Users успешно загружены')
      console.log(response);
      return fulfillWithValue(response.data)
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(setAuth(false))
      }
      return rejectWithValue('Не удалось загрузить список Users')
    }
  },
)
