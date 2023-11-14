import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterItem } from "../data/users.data";

export const charApi = createApi({
  reducerPath: 'charApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com' }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<CharacterItem, { id: string }>({
      query: ({ id }) => {
        return `/api/character/${id}`;
      },
    }),
  }),
});

export const { useFetchCharactersQuery } = charApi;