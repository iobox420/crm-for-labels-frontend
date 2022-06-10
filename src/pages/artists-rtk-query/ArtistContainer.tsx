import React, { FC } from 'react'
import { adminAPI } from '@/services/AdminGetArtistService'

const ArtistContainer: FC = () => {
  // @ts-ignore
  const { data: artists, error, isLoading, refetch } = adminAPI.useFetchAllArtistsQuery()
  const [createArtist, {}] = adminAPI.useCreateArtistMutation()
  const [updateArtist, {}] = adminAPI.useUpdateArtistMutation()
  const [deleteArtist, {}] = adminAPI.useDeleteArtistMutation()
  const handleCreate = async () => {
    await updateArtist({
      id_artist_contract:4,
      creative_pseudonym:'text in prop1',
      })
  }
  return (
    <div>
      <div className="post__list">
        {/* <button onClick={handleCreate}>Add new post</button>*/}
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {artists && artists.map((artist, i) => <div key={i}>{artist.name_2} {artist.name_1} {artist.name_3} {artist.creative_pseudonym}</div>)}

      </div>
      <button onClick={handleCreate}>create artist</button>
    </div>
  )
}

export default ArtistContainer