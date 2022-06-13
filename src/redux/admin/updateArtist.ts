import { IArtist } from '@/models/IArtist'
import AdminService from '@/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateArtist = createAsyncThunk('admin/updateArtist', async (row:IArtist, {  rejectWithValue }) => {
  try {
    console.log('update artist', row);

    const response = await AdminService.updateArtist(row)
    console.log('Данные артиста успешно обновлены')
    return row
  } catch (e: any) {
    rejectWithValue('Не удалось обновить данные артиста')
  }
})
