import { IArtist } from '@/models/IArtist'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getArtists } from '@/redux/admin/getArtists'
import { updateArtist } from '@/redux/admin/updateArtist'

interface AdminState {
  artists: IArtist[]
  isLoadingArtists: boolean
  error: string
}

const initialState: AdminState = {
  artists: [],
  isLoadingArtists: true,
  error: '',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setArtists(state, action) {
      state.artists = action.payload
      state.isLoadingArtists = true
    },
    deleteRow(state) {
      state.artists = state.artists.slice(0, -1)
    },
  },
  extraReducers: {
    [getArtists.fulfilled.type]: (state, action: PayloadAction<IArtist[]>) => {
      console.log('[getArtists.fulfilled.type]')
      state.artists = action.payload
      state.error = ''
      state.isLoadingArtists = false


    },
    [getArtists.pending.type]: state => {
      console.log('[getArtists.pending.type]')
      state.isLoadingArtists = true
    },
    [getArtists.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log('[getArtists.rejected.type]')
      state.isLoadingArtists = false
      state.error = action.payload
    },
    [updateArtist.fulfilled.type]: (state, action: PayloadAction<IArtist>) => {
      const index = state.artists.findIndex(artist => artist.id_artist_contract === action.payload.id_artist_contract)
      state.artists[index] = action.payload
      console.log(' [updateArtist.fulfilled.type]')
    },
  },
})

export default adminSlice.reducer

export const { setArtists, deleteRow } = adminSlice.actions
