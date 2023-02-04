import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, IconButton, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import AuthForm from './AuthForm';

import ProfileForm from './ProfileForm';



const Profile = () => {
    const { status, onSubmit } = useSelector(state => state.dialog.profile)
    const dispatch = useDispatch()

    return (
        <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("profile")) }} >

            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Profile</DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    pt: 1,
                    mx: 10,
                    width: 300,
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>

                <ProfileForm />

                <Divider variant="fullWidth" flexItem={true} sx={{ bgcolor: "border", my: 2 }} />
                
                <AuthForm/>

            </DialogContent>


        </Dialog >
    )
}

export default Profile