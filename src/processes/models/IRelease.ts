export interface IRelease {
  id_release: number
  fk_id_user: number
  fk_id_artist: number
  upc: string
  code: string
  territory: string
  copyright: string
  note: string
  createdAt: string
  updatedAt: string
}
