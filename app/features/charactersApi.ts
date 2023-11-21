import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterResponse } from "../data/users.data";

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com' }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<CharacterResponse, { name?: string; pageNumber: number; quantity: number }>({
      query: ({ name, pageNumber }) => {
        const nameQuery = name ? `&name=${name}` : '';
        return `/api/character?page=${pageNumber}${nameQuery}`;
      },
    }),
  }),
});

export const { useFetchCharactersQuery } = charactersApi;
