import { People, Inventory, Paid } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../LocalData/image/logo.png';

const SellerCard = ({data}) => {
    const navigate = useNavigate()

    return (
        <Box minWidth={230}  bgcolor="#2E2E2E" m={1} borderRadius={5}>
            <Box display="flex" justifyContent="center" p={2}>
                <Avatar alt="Remy Sharp" src={logo} variant="rounded" sx={{ width: 75, height: 75, bgcolor: "#3B3B3B", borderRadius: "100%", p: 1 }} />
            </Box>
            <Box m={1} display="flex" justifyContent="center">
                <Box >
                    {data.map( (d,i) => {
                       return <Box key={i} display="flex" >
                            <Typography color="#ababab" width={80}> {d.name} </Typography>
                            <Typography color="#ababab" width={10} textAlign="center"> : </Typography>
                            <Typography color="#ababab"> {d.value} </Typography>
                        </Box>
                    })}
                    <Box display="flex" justifyContent="center" mt={0.5}>
                        <IconButton onClick={() => navigate("loan")}><Paid fontSize='small'  sx={{color:"primary.main"}}/></IconButton>
                        <IconButton onClick={() => navigate("inventory")}><Inventory fontSize='small'  sx={{color:"primary.main"}}/></IconButton>
                        <IconButton onClick={() => navigate("customer")}><People fontSize='small'  sx={{color:"primary.main"}}/></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SellerCard