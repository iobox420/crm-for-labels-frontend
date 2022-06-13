import $api from '../http/api'
import { AxiosResponse } from 'axios'
import { AuthResponse } from "@/models/response/AuthResponse"
import { ISignUpData } from "@/redux/authSlice";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password })
  }

  static async signup(newUser:ISignUpData): Promise<AxiosResponse<AuthResponse>> {
    console.log(newUser)
    return $api.post<AuthResponse>('/signup', {...newUser })
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}
