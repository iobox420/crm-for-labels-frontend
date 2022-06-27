import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice, { IAuth } from '@/processes/redux/authSlice'
import adminSlice, { AdminState } from "@/processes/redux/admin/adminSlice";
import artistSlice, { IAboutMe } from "@/processes/redux/artist/artistSlice";
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
})

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch

export default store
