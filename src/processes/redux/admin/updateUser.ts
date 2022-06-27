import AdminService from '@/processes/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUserFull } from '@/processes/models/IUser'

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (user: IUserFull, { rejectWithValue }) => {
    try {
      await AdminService.updateUser(user)
      return user
    } catch (e: any) {
      rejectWithValue('Не удалось обновить данные User')
    }
  },
)
