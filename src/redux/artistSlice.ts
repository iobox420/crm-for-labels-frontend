// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

const artistSlice = createSlice({
  name: 'artist',
  initialState: {
    aboutMe: {},
    isLoadingAboutMe: false,
  },
  reducers: {
    setAboutMe(state, action) {
      state.aboutMe = {
        ...action.payload,
      }
      state.isLoadingAboutMe = true
    },
  },
})

export default artistSlice.reducer

export const { setAboutMe } = artistSlice.actions
