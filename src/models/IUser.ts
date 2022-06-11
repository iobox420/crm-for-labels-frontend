export interface IUser {
  email: string
  id_user: string
  role: string
}

export interface IUserFull extends IUser {
  created_at: string
  deleted: boolean
}
