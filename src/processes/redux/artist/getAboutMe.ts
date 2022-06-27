import ArtistService from '@/processes/services/ArtistService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAboutMe = createAsyncThunk(
  'artist/getAboutMe',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await ArtistService.getAboutMe()

      return fulfillWithValue(response.data)
    } catch (e) {

      return rejectWithValue(e)
    }
  },
)

