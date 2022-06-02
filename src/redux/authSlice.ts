import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '@/services/AuthService'
import { IUser } from '@/models/IUser'
import axios from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'
import config from '../config'
import { useNavigate } from 'react-router-dom'

interface IAuthData {
  email: string
  password: string
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

      setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  },
)
export const registration = createAsyncThunk(
  'auth/registration',
  async ({ email, password }: IAuthData, { dispatch }) => {
    try {
      const response = await AuthService.registration(email, password)
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
    const response = await AuthService.logout()
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload
    },

    setUser(state, action) {
      state.user = action.payload
    },

    setLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export default authSlice.reducer

export const { setAuth, setUser, setLoading } = authSlice.actions
