import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuth } from '@/redux/authSlice'
import { PageLimit } from '@/models/PageLimit'

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (props:PageLimit, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {

      const response = await AdminService.getUsers(props)
      console.log('Users успешно загружены')
      console.log(response)
      return fulfillWithValue(response.data)
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(setAuth(false))
      }
      return rejectWithValue('Не удалось загрузить список Users')
    }
  },
)
