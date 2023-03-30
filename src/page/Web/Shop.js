import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteShop, getShopBySeller, upadateShop } from '../../Services/shop'
import { messageActions } from '../../Store/messageSlice'
import { Button, Box, Avatar, Typography } from '@mui/material'
import { dialogActions } from '../../Store/dialogSlice'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../Store/authSlice';

const Shop = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [data, setData] = useState()
    var navigate = useNavigate()

    const loadData = async () => {
        const { data: shopData, status: shopStatus } = await getShopBySeller(auth.userID)
        if (shopStatus !== 200) {
            dispatch(messageActions.show([shopData, "error"]))
            return
        }
        setData(shopData)
    }

    useEffect(() => { loadData() }, [])

    const handleEdit = () => {
        dispatch(dialogActions.show(["shop", loadData, data]))
    }
    // Delete Shop
    const onDelete = async () => {
        const response = await deleteShop(data.id)
        if (response.status !== 200) {
            dispatch(messageActions.show(["Error on shop deletion", "error"]))
        } else {
            dispatch(messageActions.show(["shop deleted successfully"]))
            dispatch(dialogActions.hide('delete'))
            navigate("/", { replace: true });
            dispatch(authActions.logout())
        }
    }
    const handleDelete = () => {
        dispatch(dialogActions.show(["delete", onDelete, "Are you sure do you want to delete your shop?"]))
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

                <Box my={2}>
                    <Box display="flex" alignItems="center" mt={2} >
                        <LocationOnIcon />
                        <Typography fontSize={16} sx={{ ml: 1 }}>{data.address}</Typography>
                    </Box>
                </Box>

                <Box my={2}>
                    <Button variant='contained' type="button" disabled={false} size={"small" ?? "medium"} sx={{
                        ...style_btn, marginRight: 3
                    }} onClick={handleEdit}>Edit</Button>

                    <Button variant='contained' type="button" disabled={false} size={"small" ?? "medium"} sx={{
                        ...style_btn, "&:hover": { bgcolor: "#F50901" }
                    }} onClick={handleDelete}>Delete</Button>
                </Box>
            </Box>

        </>

    )
}

export default Shop

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