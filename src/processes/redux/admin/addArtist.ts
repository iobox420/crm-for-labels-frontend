import AdminService from '@/processes/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuth } from '@/processes/redux/authSlice'
import { IArtist } from '@/processes/models/IArtist'

export const addArtist = createAsyncThunk(
  'admin/addArtist',
  async (row:IArtist, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AdminService.addArtist(row)
      return fulfillWithValue(response.data)
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(setAuth(false))
      }
      return rejectWithValue('Не удалось добавить артиста')
    }
  },
)
