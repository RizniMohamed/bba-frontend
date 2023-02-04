import { Box, Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

const PopoverRole = ({ anchor, setAnchor, text }) => {
    return (
        <Popover
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sx={style_popover}
        >
            <Box p={1}>
                <Typography sx={{ mb: 1 }} color="white">
                    {text}
                </Typography>
            </Box>
        </Popover>)
}

export default PopoverRole

const style_popover = {
    '.MuiPopover-paper': {
        bgcolor: "background.mainbg",
        borderRadius: 0.3,
        mt: 0.5,
        width: 250
    },
}