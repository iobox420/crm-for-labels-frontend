export interface IUser {
  email: string | null
  id_user: string | null
  role: string | null
}

export interface IUserFull extends IUser {
  created_at: Date | string
  deleted: boolean
}

export interface IUserWithKey extends IUserFull {
  key: number
}
