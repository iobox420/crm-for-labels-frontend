import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IArtist} from "@/models/IArtist";


export const adminAPI = createApi({
  reducerPath: 'adminAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002/crm-api/admin',
    prepareHeaders: (headers/*, { getState }*/) => {
/*      const {
        auth: {
          user: { accessToken },
        },
      } = getState();*/
      const accessToken = localStorage.getItem('token')
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllArtists: build.query<IArtist[], number>({
      query: (limit: number = 5) => ({
        url: `/get-artists`,
        method:'GET'
       /* params: {
          _limit: limit
        }*/
      }),
      providesTags: result => ['Post']
    }),
    createArtist: build.mutation<IArtist, IArtist>({
      query: (post) => ({
        url: `/add-artist`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    //any поменять на IArtist после проверки
    updateArtist: build.mutation<IArtist, any>({
      query: (post) => ({
        url: `/artists`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    deleteArtist: build.mutation<IArtist, IArtist>({
      query: (post) => ({
        url: `/delete-`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post']
    }),
  })
})
