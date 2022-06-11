import { IArtist } from '@/models/IArtist'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getArtists } from '@/redux/admin/getArtists'
import { updateArtist } from '@/redux/admin/updateArtist'
import { addArtist } from './addArtist'
import { IUserFull } from '@/models/IUser'
import { getUsers } from './getUsers'

interface AdminState {
  artists: IArtist[]
  isLoadingArtists: boolean
  artistsError: string
  users: IUserFull[]
  isLoadingUsers: boolean
  usersError: string
}

const initialState: AdminState = {
  artists: [],
  isLoadingArtists: true,
  artistsError: '',
  users: [],
  isLoadingUsers: true,
  usersError: '',
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
    addRow(state) {
      state.artists = [
        ...state.artists,
        {
          id_artist_contract: 0,
          fk_id_user: 0,
          creative_pseudonym: '',
          name_2: '',
          name_1: '',
          name_3: '',
          document: '',
          address: '',
          email: '',
          inn: '',
          snils: '',
          bank_details: '',
          contract_number: '',
          contract_agreement: '',
          contract_fee: '',
          contract_fee_in_words: '',
          contract_expiration_date: '',
          deleted: false,
        },
      ]
    },
  },
  extraReducers: {
    [getArtists.fulfilled.type]: (state, action: PayloadAction<IArtist[]>) => {
      console.log('[getArtists.fulfilled.type]')
      state.artists = action.payload
      state.artistsError = ''
      state.isLoadingArtists = false
    },
    [getArtists.pending.type]: state => {
      console.log('[getArtists.pending.type]')
      state.isLoadingArtists = true
    },
    [getArtists.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log('[getArtists.rejected.type]')
      state.isLoadingArtists = false
      state.artistsError = action.payload
    },
    [updateArtist.fulfilled.type]: (state, action: PayloadAction<IArtist>) => {
      const index = state.artists.findIndex(
        artist => artist.id_artist_contract === action.payload.id_artist_contract,
      )
      state.artists[index] = action.payload
      console.log(' [updateArtist.fulfilled.type]')
    },
    [addArtist.fulfilled.type]: (state, action: PayloadAction<IArtist>) => {
      state.artists = {
        ...state.artists,
        ...action.payload,
      }
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<IUserFull[]>) => {
      state.users = action.payload
      state.usersError = ''
      state.isLoadingUsers = false
    },
  },
})

export default adminSlice.reducer

export const { setArtists, deleteRow, addRow } = adminSlice.actions
