// @ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthService from '@/services/AuthService'
import { IUser } from '@/models/IUser'
import axios from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'
import config from '../config'

interface IAuthData {
  email: string
  password: string
}

 export interface ISignUpData extends IAuthData {
  isArtist:boolean
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: IAuthData, { dispatch }) => {
    console.log('login')
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setAuth(true))
      console.log(response.data.user)
      dispatch(setUser(response.data.user))
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  },
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (newUser: ISignUpData, { dispatch }) => {
    try {
      const response = await AuthService.signup(newUser)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setAuth(true))
      dispatch(setUser(response.data.user))
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  },
)
export const logout = createAsyncThunk('auth/logout', async (arg: void, { dispatch }) => {
  try {
    await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(setAuth(false))
    dispatch(setUser({} as IUser))
  } catch (e: any) {
    console.log(e.response?.data?.message)
  }
})
export const checkAuth = createAsyncThunk('auth/checkAuth', async (arg: void, { dispatch }) => {
  dispatch(setLoading(true))
  try {
    const response = await axios.get<AuthResponse>(`${config.API_URL}/refresh`, {
      withCredentials: true,
    })
    console.log(response)
    localStorage.setItem('token', response.data.accessToken)
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
  } catch (e: any) {
    console.log(e.response?.data?.message)
  } finally {
    dispatch(setLoading(false))
  }
})

export interface IAuth {
  user: {
    email: string
    id_user: string
    role: string
  }
  isAuth: false
  isLoading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: 'string',
      id_user: 'string',
      role: 'string',
    } as IUser,
    isAuth: false,
    isLoading: false,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload
      if (action.payload) {
        localStorage.setItem('isAuth', 'true')
      } else {
        state.user = {}

        localStorage.removeItem('isAuth')
        localStorage.removeItem('email')
        localStorage.removeItem('id_user')
        localStorage.removeItem('role')
      }
    },

    setUser(state, action) {
      state.user = {
        ...action.payload,
      }
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem('id_user', action.payload.id_user)
      localStorage.setItem('role', action.payload.role)
    },

    setLoading(state, action) {
      state.isLoading = action.payload
    },
    extractAuthData(state) {
      const isAuth = localStorage.getItem('isAuth')
      if (isAuth) {
        if (isAuth === 'true') {
          state.isAuth = true
        } else {
          state.isAuth = false
        }
        state.user.email = localStorage.getItem('email')
        state.user.id_user = localStorage.getItem('id_user')
        state.user.role = localStorage.getItem('role')
      }
    },
  },
})

export default authSlice.reducer

export const { setAuth, setUser, setLoading, extractAuthData } = authSlice.actions
