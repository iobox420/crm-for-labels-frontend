import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from '@/redux/authSlice'
import adminSlice from '@/redux/adminSlice'

const rootReducers = combineReducers({
  auth: authSlice,
  admin: adminSlice,
})

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
