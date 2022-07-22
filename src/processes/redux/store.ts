import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice, { IAuth } from '@/processes/redux/authSlice'
import reactQuerySlice, { ISelectedArtistsSlice } from './reactQuerySlice'

export interface IRoot {
  reactQuerySlice: ISelectedArtistsSlice
  auth: IAuth
}

const rootReducers = combineReducers({
  rq: reactQuerySlice,
  auth: authSlice,
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
