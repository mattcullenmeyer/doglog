import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetDaysEventsInput, GetDaysEventsResponse } from './types';

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDaysEvents: builder.query<GetDaysEventsResponse, GetDaysEventsInput>({
      query: (arg) => {
        return {
          url: 'events/day',
          params: { ...arg },
        };
      },
    }),
  }),
});

export const { useGetDaysEventsQuery } = api;
