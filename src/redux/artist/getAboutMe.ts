import ArtistService from '@/services/ArtistService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearAboutMeError } from './artistSlice'

export const getAboutMe = createAsyncThunk(
  'artist/getAboutMe',
  async (_, { dispatch,fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await ArtistService.getAboutMe()
      debugger
      return fulfillWithValue(response.data)
    } catch (e) {
      debugger
      return rejectWithValue(e)
    }
  },
)

