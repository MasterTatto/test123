import React, { useState} from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import {routes} from "./routes/routes";
import '../shared/assets/styles/reset.scss';
import '../shared/assets/styles/libs.scss';
import '../shared/assets/styles/globals.scss';
import Auth from "../pages/auth";
import {useAppSelector} from "../hooks/useRedux";


function App() {
    const { isAuth } = useAppSelector(state => state.authReducer)
    const [userToken ,setUserToken] = useState<any>(localStorage.getItem('token'))
    const navigate = useNavigate()
   if (isAuth) navigate(0)

    return (
        <>
            <Routes>
                {
                    userToken ?
                        routes.map(route =>
                            <Route
                                path={route.path}
                                element={route.element}
                                key={route.path}
                            />
                        )
                        :
                        <Route path="*" element=<Auth/>/>
                }
            </Routes>
        </>
    );
}

export default App;
