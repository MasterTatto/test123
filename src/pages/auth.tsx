import Paper from "@mui/material/Paper";
import logo from '../shared/assets/images/authLogo.svg'
import {Button, Checkbox, Stack} from "@mui/material";
import {Link, redirect, useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import IconConnected from "../shared/assets/images/icons/iconConnected";
import IconTg from "../shared/assets/images/icons/iconTg";
import {useGetTokenMutation} from "../store/API/authApi";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {barChartSlice} from "../store/slice/barChartSlice";
import {authSlice} from "../store/slice/authSlice";

interface IType {
    isFinish?: boolean
}


const Auth: FC<IType> = ({isFinish}) => {
    const {auth} = authSlice.actions
    const dispatch = useAppDispatch()
    const [fetchToken, {data, isLoading, error}] = useGetTokenMutation()
    const location = useLocation()
    const locationHash = location?.search?.split('=').pop()
    const registrationHash = location?.pathname
    const navigate = useNavigate()
    const [value, setValue] = useState(false)
    const [registrationFinish, setRegistrationFinish] = useState(false)

    useEffect(() => {
        fetchToken(locationHash)
    }, [])
    useEffect(() => {
        if (data) {
            if (registrationHash == '/reg' && registrationFinish){
                localStorage.setItem('token', `${data?.accessToken}`)
                setTimeout(() => {
                    dispatch(auth(true))
                    navigate('/')
                }, 1000)

            }else if (registrationHash !== '/reg'){
                localStorage.setItem('token', `${data?.accessToken}`)
                dispatch(auth(true))
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        }
    }, [isLoading,registrationFinish])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(!value)
    }
    return (
        <Paper sx={{
            maxWidth: 620,
            padding: 14,
            position: 'fixed',
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%,-50%)`
        }}>
            <Stack alignItems="center" sx={{textAlign: 'center'}}>
                <Stack sx={{width: 56, height: 70, mb: 28}}>
                    <img src={logo} alt="logo"/>
                </Stack>
                <Stack className="h2" alignItems="center" spacing={7} sx={{mb: 14}}>
                    <span>Добро пожаловать на CopyTen!</span>
                    <span
                        className="white-90">Вход осуществляется с помощью Телеграмм, зарегистрированный в нашем боте:</span>
                    <Stack className="white-90" alignItems="center" direction="row" spacing={2}>
                        <span>Бот:</span>
                        <a className="link" href="https://t.me/+yyCB128FQ1JmYTIy"
                           target="_blank">https://t.me/+yyCB128FQ1JmYTIy</a>
                    </Stack>
                </Stack>

                {
                    registrationHash === '/reg' ?
                        <Stack spacing={5}>
                            <Stack direction="row" alignItems="center" spacing={4}>
                                <Checkbox
                                    checked={value}
                                    onChange={handleChange}
                                    size="small"
                                    color="info"
                                />
                                <span className="subHeaders">
                                    <span className="white-100">Принимаю Условия </span>
                                    <span className="link">пользовательского соглашения</span>
                                </span>
                            </Stack>
                            <Button
                                onClick={() => {

                                    setRegistrationFinish(true)
                                }}
                                fullWidth
                                variant="contained"
                                color="info"
                                sx={{height: 48}}
                                disabled={!value}
                            >
                                Завершить регистрацию
                            </Button>
                        </Stack>
                        : <Button
                            component={Link}
                            to="https://t.me/copyten_auth_bot"
                            fullWidth
                            variant="contained"
                            color="info"
                            sx={{height: 48}}
                            startIcon={<IconTg/>}
                        >
                            Вход в систему
                        </Button>
                }


            </Stack>
        </Paper>
    );
};

export default Auth;