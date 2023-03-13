import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, IconButton, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import AuthForm from './AuthForm';

import ProfileForm from './ProfileForm';

const Profile = () => {

    return (
        <Box display="flex" alignItems="end" mt={5}>
            <ProfileForm />
            <Divider orientation='vertical' variant="fullWidth" flexItem={true} sx={{ bgcolor: "border", mx: 2 }} />
            <AuthForm />
        </Box>
    )
}

export default Profile