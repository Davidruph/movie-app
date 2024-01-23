import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const OMDB_API_KEY = "b3ad2034";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://www.omdbapi.com/",
});

export const omdbApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: (searchTerm, page = 1) =>
        `?apikey=${OMDB_API_KEY}&s=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useSearchMoviesQuery } = omdbApi;

export default omdbApi;
