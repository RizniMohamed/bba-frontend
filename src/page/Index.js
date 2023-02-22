import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
    const theme = useTheme()
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return <Navigate to={onlySmallScreen ? "m" : "w"} />
}

export default Index