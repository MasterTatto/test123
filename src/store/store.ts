import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userApi} from "./API/userApi";
import barChartReducer from './slice/barChartSlice'
import authReducer from './slice/authSlice'
import setParametersReducer from "./slice/parametersSlice"
import {serverApi} from "./API/serverApi";
import {productApi} from "./API/productApi";
import {referralApi} from "./API/referalApi";
import {forexAccountsApi} from "./API/forexAccountsApi";
import {profileApi} from "./API/profileApi";
import {subscribesApi} from "./API/subscribesApi";
import {tradersUserApi} from "./API/tradersUserApi";
import {tradeSetsApi} from "./API/tradeSetsApi";
import {traderAdminApi} from "./API/tradersAdminApi";
import {chartApi} from "./API/chartApi";


const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [referralApi.reducerPath]: referralApi.reducer,
    [forexAccountsApi.reducerPath]: forexAccountsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [subscribesApi.reducerPath]: subscribesApi.reducer,
    [tradersUserApi.reducerPath]: tradersUserApi.reducer,
    [tradeSetsApi.reducerPath]: tradeSetsApi.reducer,
    [traderAdminApi.reducerPath]: traderAdminApi.reducer,
    [chartApi.reducerPath]: chartApi.reducer,
    barChartReducer,
    authReducer,
    setParametersReducer,
})


export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (gDM) => gDM().concat(
            userApi.middleware,
            serverApi.middleware,
            productApi.middleware,
            referralApi.middleware,
            forexAccountsApi.middleware,
            profileApi.middleware,
            subscribesApi.middleware,
            tradersUserApi.middleware,
            tradeSetsApi.middleware,
            traderAdminApi.middleware,
            chartApi.middleware,
            ),
    });

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']

