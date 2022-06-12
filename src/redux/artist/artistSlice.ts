
import { createSlice } from '@reduxjs/toolkit'

interface IAboutMe {
  id_artist_contract:number
  fk_id_user:number
  creative_pseudonym:string
  name_2:string
  name_1:string
  name_3:string
  document:string
  address:string
  email:string
  inn:string
  snils:string
  bank_details:string
  contract_number:string
  contract_agreement:string
  contract_fee:string
  contract_fee_in_words:string
  contract_expiration_date:string
  deleted:false
}


interface ArtistState {
  aboutMe: IAboutMe,
  isLoadingAboutMe: boolean
}

const initArtistState:ArtistState = {
  aboutMe: {
    id_artist_contract:0,
    fk_id_user:0,
    creative_pseudonym:"",
    name_2:"",
    name_1:"",
    name_3:"",
    document:"",
    address:"",
    email:"",
    inn:"",
    snils:"",
    bank_details:"",
    contract_number:"",
    contract_agreement:"",
    contract_fee:"",
    contract_fee_in_words:"",
    contract_expiration_date:"",
    deleted:false
  },
  isLoadingAboutMe: false,
}

const artistSlice = createSlice({
  name: 'artist',
  initialState: initArtistState,
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
