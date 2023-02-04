import React, { useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { Outlet, useNavigate } from 'react-router-dom'
import MLogin from './Mobile/Login'
import WLogin from './Web/Login'

const Login = () => {
    const theme = useTheme()
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return onlySmallScreen ? <MLogin /> : <WLogin />
}

export default Login