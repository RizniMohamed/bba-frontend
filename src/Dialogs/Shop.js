import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upadateShop } from '../Services/shop'
import { messageActions } from '../Store/messageSlice'

import { Avatar, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Input, TextField } from '@mui/material'
import { Box } from '@mui/system'
import * as yup from 'yup'
import { dialogActions } from '../Store/dialogSlice'

const initVals = {
    name: "",
    address: "",
    image: "",
}

const Schema = yup.object().shape({
    name: yup.string().required("Required*"),
    address: yup.string().required("Required*"),
    image: yup.mixed().required("Required*"),
})

const Shop = () => {

    const dispatch = useDispatch()
    const { status, data, onSubmit: loadData } = useSelector(state => state.dialog.shop)
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState(data.image)

   

    const upadte = async (inVals) => {
        setLoading(true)
        const { data: res, status } = await upadateShop(data.id, inVals);
        if (status !== 200) {
            dispatch(messageActions.show([res, "error"]))
            setLoading(false)
            return
        }
        setLoading(false)
        dispatch(messageActions.show([res]))
        loadData()
        dispatch(dialogActions.hide("shop"))
    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: upadte,
        validationSchema: Schema,
    })


    useEffect(() => {
        setImage(data.image)
        formik.values.name = data?.name
        formik.values.address = data?.address
        formik.values.image = data?.image
    }, [data])


    const handleAvatarChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
            formik.values.image = base64
            setImage(URL.createObjectURL(e.target.files[0]))
        };
        reader.readAsDataURL(e.target.files[0]);
    }


    return (
        <Dialog open={status} onClose={() => {
            formik.resetForm()
            setImage("")
            setLoading(false)
            dispatch(dialogActions.hide("shop"))
        }}  >
            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Shop</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, py: 0, width: 300 }}>
                <form onSubmit={formik.handleSubmit}>

                    <Box display="flex" justifyContent="center" mb={2}>
                        <label htmlFor="icon-button-file">
                            <Input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                name='image'
                                sx={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="span"
                                sx={{
                                    border: formik.touched.image && Boolean(formik.errors.image) ? "2px solid red" : "",
                                    borderRadius: 0.5,
                                }} >
                                <Avatar variant='square' src={image} sx={{ height: 125, width: 125, borderRadius: 0.5, }} />
                            </IconButton>
                        </label>
                    </Box>


                    <Box mt={1.5}  >
                        <TextField
                            variant="outlined"
                            size='small'
                            type="text"
                            placeholder='Shop Name'
                            name='name'
                            sx={style_txtbox}
                            defaultValue={data.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            onBlur={formik.handleBlur}
                        />
                    </Box>

                    <Box mt={1.5}  >
                        <TextField
                            variant="outlined"
                            size='small'
                            type="text"
                            placeholder='Address'
                            name='address'
                            defaultValue={data.address}
                            sx={style_txtbox}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            onBlur={formik.handleBlur}
                        />
                    </Box>

                    <Box display="flex" justifyContent="end">
                        {!loading ? <Button
                            variant='contained'
                            type="submit"
                            sx={style_btn}
                        >
                            Update
                        </Button> : <CircularProgress sx={{ my: 2, mr: 2, width: "100%" }} size={25} />}
                    </Box>
                </form>
            </DialogContent>

        </Dialog >

    )
}

export default Shop


const style_txtbox = {
    width: "100%",
    ".MuiOutlinedInput-root": {
        bgcolor: "#3B3B3B",
        borderRadius: 10
    }
}

const style_btn = {
    mt: 2,
    mb: 2,
    minWidth: 100,
    // bgcolor: "secondary.main",
    color: "white",
}