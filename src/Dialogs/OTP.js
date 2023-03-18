import React from 'react'
import { dialogActions } from '../Store/dialogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogContent, DialogTitle } from '@mui/material'

const OTP = () => {
    const dispatch = useDispatch()
    const { status } = useSelector(state => state.dialog.OTP)

    return (
        <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("OTP")) }}  >
            <DialogTitle fontWeight={700} fontSize={30} textAlign="center">Sorry :(</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, mb: 2, py: 0, width: 500 }}>
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 2, mx: "auto" }} >Reset password feature is not implemented yet. please contact administration. admin@bumblebee.com</Typography>
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, mx: "auto" }} >sorry for the inconviences</Typography>
            </DialogContent>
        </Dialog >
    )
}

export default OTP