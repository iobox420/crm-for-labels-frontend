import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice, { IAuth } from '@/redux/authSlice'
import adminSlice, { AdminState } from "@/redux/admin/adminSlice";
import artistSlice, { IAboutMe } from "@/redux/artist/artistSlice";
import {  adminAPI } from "@/services/AdminGetArtistService";
import reactQuerySlice, { Irq } from "./reactQuerySlice";

export interface IRoot {
  reactQuerySlice:Irq,
  auth: IAuth
  admin: AdminState
  artist: IAboutMe
}

const rootReducers = combineReducers({
  rq:reactQuerySlice,
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
export type AppDispatch = typeof store.dispatch

export default store
