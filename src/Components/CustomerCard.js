import { People, Inventory, Paid } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import logo from '../LocalData/image/logo.png';

const CustomerCard = () => {
    return (
        <Box minWidth={230}  bgcolor="#2E2E2E" m={1} borderRadius={5}>
            <Box display="flex" justifyContent="center" p={2}>
                <Avatar alt="Remy Sharp" src={logo} variant="rounded" sx={{ width: 75, height: 75, bgcolor: "#3B3B3B", borderRadius: "100%", p: 1 }} />
            </Box>
            <Box m={1} display="flex" justifyContent="center">
                <Box >
                    <Box display="flex" >
                        <Typography color="#ababab" width={80}> CID </Typography>
                        <Typography color="#ababab" width={10} textAlign="center"> : </Typography>
                        <Typography color="#ababab"> Rizni </Typography>
                    </Box>
                    <Box display="flex">
                        <Typography color="#ababab" width={80}> Name </Typography>
                        <Typography color="#ababab" width={10} textAlign="center"> : </Typography>
                        <Typography color="#ababab"> Rizni Mohamed </Typography>
                    </Box>
                    <Box display="flex">
                        <Typography color="#ababab" width={80}> Shop Name </Typography>
                        <Typography color="#ababab" width={10} textAlign="center"> : </Typography>
                        <Typography color="#ababab"> Rizni Mohamed</Typography>
                    </Box>
                    <Box display="flex">
                        <Typography color="#ababab" width={80}> DOB </Typography>
                        <Typography color="#ababab" width={10} textAlign="center"> : </Typography>
                        <Typography color="#ababab"> 2000.04.18</Typography>
                    </Box>
                    <Box display="flex">
                        <Typography color="#ababab" width={80}> Contact </Typography>
                        <Typography color="#ababab" width={10} textAlign="center"> : </Typography>
                        <Typography color="#ababab"> 0775824807</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={0.5}>
                        <IconButton><Paid fontSize='small'  sx={{color:"primary.main"}}/></IconButton>
                        <IconButton><Inventory fontSize='small'  sx={{color:"primary.main"}}/></IconButton>
                        <IconButton><People fontSize='small'  sx={{color:"primary.main"}}/></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CustomerCard