import React from 'react'
import loginwall from '../../LocalData/image/mobile.png'
import { Box } from '@mui/material'

const MobileAPP = () => {
    return (
        <Box
            component="div"
            sx={{
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box
                component="img"
                src={loginwall}
                alt='login Image'
                sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
            />
        </Box>
    )
}

export default MobileAPP
