import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPersonByID, deletePerson } from '../../Services/person'
import { messageActions } from '../../Store/messageSlice'
import { Button, Box, Avatar, Typography } from '@mui/material'
import { dialogActions } from '../../Store/dialogSlice'
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../Store/authSlice';
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CakeIcon from '@mui/icons-material/Cake'

const Profile = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [data, setData] = useState()
    var navigate = useNavigate()

    const loadData = async () => {
        const { data: profileData, status: profileStatus } = await getPersonByID(auth.userID)
        if (profileStatus !== 200) {
            dispatch(messageActions.show([profileData, "error"]))
            return
        }
        setData(profileData)
    }

    useEffect(() => { loadData() }, [])

    const handleEdit = () => {
        dispatch(dialogActions.show(["profile", loadData, data]))
    }
    // Delete Shop
    const onDelete = async () => {
        const response = await deletePerson(data.id)
        if (response.status !== 200) {
            dispatch(messageActions.show(["Error on account deletion", "error"]))
        } else {
            dispatch(messageActions.show(["account deleted successfully"]))
            dispatch(dialogActions.hide('delete'))
            navigate("/", { replace: true });
            dispatch(authActions.logout())
        }
    }
    const handleDelete = () => {
        dispatch(dialogActions.show(["delete", onDelete, "Are you sure do you want to delete your account?"]))
    }
    const handlePassword = () => {
        dispatch(dialogActions.show(["changePassword", loadData , data]))
    }

    if (!data) return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="70vh">
            <Typography fontSize={22} textAlign="center" fontWeight={900}>Loading...</Typography>
        </Box>
    )
    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} height={"80vh"} justifyContent="center" >
                <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={data.image || "/default-profile-picture.jpg"} />
                <Typography fontSize={16} fontWeight={700} sx={{ mt: 3 }}>{data.name}</Typography>

                <Box justifyContent="flex-start">
                    <Box my={2}>
                        <Box display="flex" alignItems="center" mt={2}>
                            <CakeIcon />
                            <Typography fontSize={16} sx={{ ml: 1 }}>{data.dob}</Typography>
                        </Box>
                    </Box>

                    <Box my={2}>
                        <Box display="flex" alignItems="center" mt={2}>
                            <LocalPhoneIcon />
                            <Typography fontSize={16} sx={{ ml: 1 }}>{data.contact}</Typography>
                        </Box>
                    </Box>

                    <Box my={2}>
                        <Box display="flex" alignItems="center" mt={2}>
                            <EmailIcon />
                            <Typography fontSize={16} sx={{ ml: 1 }}>{data.email}</Typography>
                        </Box>
                    </Box>

                    <Box my={2}>
                        <Box display="flex" alignItems="center" mt={2}>
                            <LocationOnIcon />
                            <Typography fontSize={16} sx={{ ml: 1 }}>{data.address}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box my={2}>
                    <Button variant='contained' type="button" disabled={false} size={"small" ?? "medium"} sx={{
                        ...style_btn, marginRight: 3
                    }} onClick={handleEdit}>Edit</Button>

                    <Button variant='contained' type="button" disabled={false} size={"small" ?? "medium"} sx={{
                        ...style_btn, marginRight: 3
                    }} onClick={handlePassword}>Change Password</Button>

                    <Button variant='contained' type="button" disabled={false} size={"small" ?? "medium"} sx={{
                        ...style_btn, "&:hover": { bgcolor: "#F50901" }
                    }} onClick={handleDelete}>Delete</Button>
                </Box>
            </Box>

        </>

    )
}

export default Profile

const style_btn = {
    mt: 2,
    mb: 2,
    minWidth: 100,
    bgcolor: "secondary.main",
    color: "white",
    ":hover": {
        bgcolor: "secondary.light",
    }
}
