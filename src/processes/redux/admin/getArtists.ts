import AdminService from '@/processes/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuth } from '@/processes/redux/authSlice'
import { PageLimit } from "@/processes/models/PageLimit";

export const getArtists = createAsyncThunk(
  'admin/getArtists',
  async (props:PageLimit, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AdminService.getArtists(props)
      return fulfillWithValue(response.data)
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(setAuth(false))
      }
      return rejectWithValue('Не удалось загрузить список артистов')
    }
  },
)
