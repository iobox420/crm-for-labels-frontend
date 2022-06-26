import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAboutMe } from './getAboutMe'
import RejectedValue from '@/processes/models/RejectedValue'

export interface IAboutMe {
  id_artist_contract: number
  fk_id_user: number
  creative_pseudonym: string
  surname: string
  name: string
  patronymic: string
  document: string
  address: string
  email: string
  inn: string
  snils: string
  bank_details: string
  contract_number: string
  contract_agreement: string
  contract_fee: string
  contract_fee_in_words: string
  contract_expiration_date: string
  deleted: false
}

interface ArtistState {
  aboutMe: IAboutMe
  isLoadingAboutMe: boolean
  aboutMeError: string
}

const initArtistState: ArtistState = {
  aboutMe: {
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
  isLoadingAboutMe: false,
  aboutMeError: '',
}

const artistSlice = createSlice({
  name: 'artist',
  initialState: initArtistState,
  reducers: {
    clearAboutMeError(state) {
      state.aboutMeError = ''
    },
  },
  extraReducers: {
    [getAboutMe.fulfilled.type]: (state, action: PayloadAction<IAboutMe>) => {
      console.log('about me loading successfull')
      console.log(action.payload)

      state.aboutMe = {
        ...action.payload,
      }
      state.isLoadingAboutMe = true
    },
    [getAboutMe.rejected.type]: (state, action: PayloadAction<RejectedValue>) => {
      console.log('[getAboutMe.rejected.type]');
      state.aboutMeError = action.payload.response.data.message
      state.isLoadingAboutMe = true
    },
    [getAboutMe.pending.type]: state => {
      console.log('pending');
      state.aboutMeError = ''
    },
  },
})

export default artistSlice.reducer

