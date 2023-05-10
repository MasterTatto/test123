import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const userToken = localStorage.getItem('token')
export const tradeSetsApi = createApi({
    reducerPath: 'tradeSetsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL}/admin/forex`,
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-type", "application/json")
            headers.set("Accept", "application/json")
            headers.set("Authorization", `Bearer ${userToken}`)
        },
    }),
    tagTypes: ['Set'],
    endpoints: (build) => ({
        getAllAdminSets: build.query({
            query: (page) => ({
                url: '/sets',
                params: {
                    page,
                }
            }),
            providesTags: ['Set'],
        }),
        getAllLinkedTraders: build.query({
            query: (id) => ({
                url: `/set/${id}/traders`
            }),
            providesTags: ['Set'],
        }),
        getAllAdminTraders: build.query({
            query: (page) => ({
                url: '/traders',
                params: {
                    page,
                }
            }),
            providesTags: ['Set'],
        }),

        addSet: build.mutation({
            query: (body) => ({
                url: `/set`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Set']
        }),
        updateSet: build.mutation({
            query: ({body, id}) => ({
                url: `/set/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Set']
        }),
        settingsTrader: build.mutation({
            query: ({body, idSet,idTrader}) => ({
                url: `set/${idSet}/link-trader/${idTrader}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Set']
        }),
        updateSettingsTrader: build.mutation({
            query: ({body,idTrader}) => ({
                url: `/trader-to-set-link/${idTrader}/settings`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Set']
        }),
        deleteSet: build.mutation({
            query(id) {
                return {
                    url: `/set/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Set']
        }),
        deleteTrader: build.mutation({
            query(id) {
                return {
                    url: `/trader-to-set-link/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Set']
        }),
    })
});

export const {
    useGetAllAdminSetsQuery,
    useGetAllAdminTradersQuery,
    useGetAllLinkedTradersQuery,
    useUpdateSetMutation,
    useSettingsTraderMutation,
    useUpdateSettingsTraderMutation,
    useAddSetMutation,
    useDeleteSetMutation,
    useDeleteTraderMutation
} = tradeSetsApi;

export const {getAllAdminSets} = tradeSetsApi.endpoints;