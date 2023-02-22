import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

const ProductCard = ({ data: { image, price, name } }) => {

    return (
        <Box width={[150,200]} bgcolor="#2E2E2E" m={1} borderRadius={2} display="flex" flexDirection="column" >
            <Avatar src={image} variant="square" sx={{ width: [150,200], height: 100, bgcolor: "#3B3B3B", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
            <Box m={1} >
                <Typography color="#ababab"> {name} </Typography>
                <Typography color="#ababab" sx={{color:"primary.main"}} > {price} LKR</Typography>
            </Box>
        </Box>
    )
}
export default ProductCard