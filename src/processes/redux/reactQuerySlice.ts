import { createSlice } from '@reduxjs/toolkit'
import { IArtist } from '@/processes/models/IArtist'

export interface Irq {
  selectedArtist: IArtist
  selectedArtistId:string | undefined
}

const initialState = {
  selectedArtist: {},
  selectedArtistId:undefined
} as Irq

const reactQuerySlice = createSlice({
  name: 'rq',
  initialState,
  reducers: {
    setSelectedArtist(state, action) {
      state.selectedArtist = action.payload
    },
    setSelectedArtistId(state, action) {
      state.selectedArtistId = action.payload
    },
  },
})

export default reactQuerySlice.reducer
export const { setSelectedArtistId,setSelectedArtist } = reactQuerySlice.actions
