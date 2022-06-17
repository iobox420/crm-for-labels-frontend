import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUserFull } from "@/models/IUser";

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (user:IUserFull, { rejectWithValue }) => {
    try {
      console.log('update artist', user)

      const response = await AdminService.updateUser(user)
      console.log('Данные User успешно обновлены')
      return user
    } catch (e: any) {
      rejectWithValue('Не удалось обновить данные User')
    }
  },
)
