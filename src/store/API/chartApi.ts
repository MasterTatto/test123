import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const userToken = localStorage.getItem('token')
export const chartApi = createApi({
    reducerPath: 'chartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL}/user/forex/trader`,
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-type", "application/json")
            headers.set("Accept", "application/json")
            headers.set("Authorization", `Bearer ${userToken}`)
        },
    }),

    endpoints: (build) => ({
        getBalanceLastMonth: build.query({
            query: (id) => ({
                url: `/${id}/graphs//balance/last-month`
            }),
        }),
        getBalanceCurrentMonth: build.query({
            query: (id) => ({
                url: `/${id}/graphs//balance/current-month`
            }),
        }),
        getBalanceYear: build.query({
            query: (id) => ({
                url: `/${id}/graphs//balance/last-month`
            }),
        }),
    })
});

export const {
    useGetBalanceLastMonthQuery,
    useGetBalanceCurrentMonthQuery,
    useGetBalanceYearQuery

} = chartApi;

export const { getBalanceLastMonth } = chartApi.endpoints;