import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice, { IAuth } from '@/redux/authSlice'
import adminSlice from '@/redux/admin/adminSlice'
import artistSlice from '@/redux/artist/artistSlice'
import {  adminAPI } from "@/services/AdminGetArtistService";

export interface IRoot {
  auth: IAuth
  admin: any
  artist: any
}

const rootReducers = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  artist: artistSlice,
  [adminAPI.reducerPath]: adminAPI.reducer
})

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adminAPI.middleware),
})

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = AppStore['dispatch']

export default store
