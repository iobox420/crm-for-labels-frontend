import { IArtist } from '@/processes/models/IArtist'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getArtists } from '@/processes/redux/admin/getArtists'
import { updateArtist } from '@/processes/redux/admin/updateArtist'
import { addArtist } from './addArtist'
import { IUserFull } from '@/processes/models/IUser'
import { getUsers } from './getUsers'
import { updateUser } from './updateUser'
import { getResCountRows } from "@/processes/models/response/getResCountRows";

export interface AdminState {
  artists: IArtist[]
  artistsCount:number
  isLoadingArtists: boolean
  artistsError: string
  users: IUserFull[]
  usersCount:number
  isLoadingUsers: boolean
  usersError: string
  test: string
  editingKey: any
}

const initialState: AdminState = {
  artists: [],
  artistsCount:0,
  isLoadingArtists: true,
  artistsError: '',
  users: [],
  usersCount:0,
  isLoadingUsers: true,
  usersError: '',
  test: '1',
  editingKey: '',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setEditingKey(state, action) {
      state.editingKey = action.payload
    },
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
          surname: '',
          name: '',
          patronymic: '',
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
    [getArtists.fulfilled.type]: (state, action: PayloadAction<getResCountRows<IArtist[]>>) => {
      state.artists = action.payload.rows
      state.artistsCount = action.payload.count
      state.artistsError = ''
      state.isLoadingArtists = false
    },
    [getArtists.pending.type]: state => {
      state.isLoadingArtists = true
    },
    [getArtists.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingArtists = false
      state.artistsError = action.payload
    },
    [updateArtist.fulfilled.type]: (state, action: PayloadAction<IArtist>) => {
      state.editingKey = ''

      const index = state.artists.findIndex(
        artist => artist.id_artist_contract === action.payload.id_artist_contract,
      )
      state.artists[index] = action.payload
    },
    [addArtist.fulfilled.type]: (state, action: PayloadAction<IArtist>) => {
      state.artists = {
        ...state.artists,
        ...action.payload,
      }
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<getResCountRows<IUserFull[]>>) => {
      // noinspection UnnecessaryLocalVariableJS

      const users = action.payload.rows.map(user => {
        return {
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }
      })
      state.usersCount = action.payload.count
      state.users = users
      state.usersError = ''
      state.isLoadingUsers = false
    },
    [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingUsers = false
      state.usersError = action.payload
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<IUserFull>) => {
      state.editingKey = ''
      const index = state.users.findIndex(user => user.id_user === action.payload.id_user)
      state.users[index] = {
        ...action.payload,
        // @ts-ignore need
        deleted:JSON.parse(action.payload.deleted)
      }
    },
  },
})

export default adminSlice.reducer

export const {  setEditingKey } = adminSlice.actions
