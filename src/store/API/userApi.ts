import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IServerData, IUserAccountsData} from "../../types";
import {useAppSelector} from "../../hooks/useRedux";

 const userToken = localStorage.getItem('token')
// setTimeout(()=>{
// },3000)
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_URL}/user/forex`,
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-type", "application/json")
            headers.set("Accept", "application/json")
            headers.set("Authorization", `Bearer ${userToken}`)
        },
    }),
    tagTypes: ['Accounts'],
    endpoints: (build) => ({
        getServers: build.query<IServerData,string>({
            query: () => ({
                url: '/servers'
            })
        }),
        getAccounts: build.query<IUserAccountsData, any>({
            query: (page) => ({
                url: '/accounts',
                params:{
                    page,
                }
            }),
            providesTags: ['Accounts'],
        }),
           getSet: build.query({
            query: (page) => ({
                url: '/sets',
                params:{
                    page,
                }
            }),
            providesTags: ['Accounts'],
        }),
        getAccountDashboard: build.query({
            query: (id) => ({
                url: `/account/${id}`,
            }),
        }),
        addAccount: build.mutation({
            query: (body) => ({
                url: `/account`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Accounts']
        }),
          addAccountSubscribe: build.mutation({
            query: ({idSet, traderId, body}) => ({
                url: `/set/${idSet}/account/${traderId}/subscribe`,
                method: 'POST',
            }),
            invalidatesTags: ['Accounts']
        }),
        updateAccount: build.mutation({
            query: ({body, id}) => ({
                url: `/account/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Accounts']
        }),
        deleteAccount: build.mutation({
            query: (id) => ({
                url: `/account/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Accounts']
        }),
    })
});

export const {
    useGetServersQuery,
    useGetAccountsQuery,
    useGetAccountDashboardQuery,
    useGetSetQuery,
    useAddAccountMutation,
    useAddAccountSubscribeMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
} = userApi;

export const {getAccounts} = userApi.endpoints;