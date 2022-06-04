import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from '@/redux/authSlice'
import adminSlice from '@/redux/adminSlice'
import artistSlice from '@/redux/artistSlice'

const rootReducers = combineReducers({
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

export default store
