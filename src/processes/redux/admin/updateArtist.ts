import AdminService from '@/processes/services/AdminService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IArtist } from "@/processes/models/IArtist";

export const updateArtist = createAsyncThunk('admin/updateArtist', async (row:IArtist, { fulfillWithValue, rejectWithValue }) => {
  try {
    console.log(row);
    await AdminService.updateArtist(row)
    return fulfillWithValue(row)
  } catch (e: any) {
    return rejectWithValue('Не удалось обновить данные артиста')
  }
})
