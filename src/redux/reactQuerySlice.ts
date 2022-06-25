import { createSlice } from '@reduxjs/toolkit'
import { IArtist } from '@/models/IArtist'

export interface Irq {
  selectedArtist: IArtist
}

const initialState = {
  selectedArtist: {},
}

const reactQuerySlice = createSlice({
  name: 'rq',
  initialState,
  reducers: {
    setSelectedArtist(state, action) {
      state.selectedArtist = action.payload
    },
  },
})

export default reactQuerySlice.reducer
export const { setSelectedArtist } = reactQuerySlice.actions
