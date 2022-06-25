export interface IVideoclip {
  id_videoclip: number
  fk_id_track: number
  fk_id_album: number
  fk_id_release: number
  fk_id_act: number
  fk_id_user: number
  fk_id_artist: number
  code: string
  title: string
  author_of_text: string
  author_of_music: string
  phonogram_timing: string
  director_screenwriter: string
  country_of_origin: string
  territory_video: string
  age_category: string
  createdAt: string
  updatedAt: string
}
