import AdminService from '@/processes/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IArtist } from "@/processes/models/IArtist";

export const updateArtist = createAsyncThunk('admin/updateArtist', async (row:IArtist, {  rejectWithValue }) => {
  try {
    await AdminService.updateArtist(row)
    return row
  } catch (e: any) {
    rejectWithValue('Не удалось обновить данные артиста')
  }
})
