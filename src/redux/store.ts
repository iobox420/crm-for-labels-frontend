import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice.js'

const rootReducers = combineReducers({
  auth: authSlice,
})

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
