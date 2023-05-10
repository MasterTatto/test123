import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const userToken = localStorage.getItem('token')
export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL}/authentication`,
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-type", "application/json")
            headers.set("Accept", "application/json")
            headers.set("Authorization", `Bearer ${userToken}`)
        },
    }),

    endpoints: (build) => ({
        getProfile: build.query({
            query: () => ({
                url: '/check-token'
            }),
        }),
    })
});

export const { useGetProfileQuery } = profileApi;

export const { getProfile } = profileApi.endpoints;