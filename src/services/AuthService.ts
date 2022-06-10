import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { signup } from '@/redux/authSlice'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password })
  }

  static async signup(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    console.log(email, password)
    return $api.post<AuthResponse>('/signup', { email, password })
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}
