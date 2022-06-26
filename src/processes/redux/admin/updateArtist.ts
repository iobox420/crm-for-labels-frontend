import AdminService from '@/processes/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IArtist } from "@/processes/models/IArtist";

export const updateArtist = createAsyncThunk('admin/updateArtist', async (row:IArtist, {  rejectWithValue }) => {
  try {
    console.log('update artist', row);
    await AdminService.updateArtist(row)
    console.log('Данные артиста успешно обновлены')
    return row
  } catch (e: any) {
    rejectWithValue('Не удалось обновить данные артиста')
  }
})