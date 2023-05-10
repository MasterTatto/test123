import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const userToken = localStorage.getItem('token')
export const tradersUserApi = createApi({
    reducerPath: 'tradersUserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL}/user/forex/`,
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-type", "application/json")
            headers.set("Accept", "application/json")
            headers.set("Authorization", `Bearer ${userToken}`)
        },
    }),
    tagTypes: ['Trader'],
    endpoints: (build) => ({
        getAllUserTraders: build.query({
            query: (page) => ({
                url: '/traders',
                params: {
                    page,
                }
            }),
            providesTags: ['Trader'],
        }),
        getHistory: build.query({
            query: (id) => ({
                url: `trader/${id}/history`
            }),
        }),
        getTrader: build.query({
            query: (id) => ({
                url: `trader/${id}`
            }),
        }),
        addTrader: build.mutation({
            query: (body) => ({
                url: `/server`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Trader']
        }),
    })
});

export const { useGetAllUserTradersQuery, useGetHistoryQuery, useGetTraderQuery } = tradersUserApi;

export const { getAllUserTraders } = tradersUserApi.endpoints;