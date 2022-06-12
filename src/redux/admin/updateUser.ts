import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      console.log('update artist', user)
      // @ts-ignore
      const response = await AdminService.updateUser(user)
      console.log('Данные User успешно обновлены')
      return user
    } catch (e: any) {
      rejectWithValue('Не удалось обновить данные User')
    }
  },
)
