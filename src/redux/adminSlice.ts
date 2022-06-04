import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    artists: [],
    isLoadingArtists: false,
  },
  reducers: {
    setArtists(state, action) {
      // @ts-ignore
      state.artists = [...action.payload]
      state.isLoadingArtists = true
    },
  },
})

export default adminSlice.reducer

export const { setArtists } = adminSlice.actions
