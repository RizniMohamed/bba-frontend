import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Input, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import defaultProduct from '../LocalData/image/default_product.png'
import { dialogActions } from '../Store/dialogSlice'
// import { sendMail } from '../../services/mail'
// import { getUser_FP } from '../../services/user'

const Product = () => {
    const dispatch = useDispatch()
    const { status, data, onSubmit } = useSelector(state => state.dialog.product)

    const [image, setImage] = useState(defaultProduct)

    const handleAvatarChange = (e) => {
        formik.values.image = e.target.files[0]
        formik.errors.image = undefined
        setImage(URL.createObjectURL(formik.values.image))
    }
    const initVals = {
        image: undefined,
        name: undefined,
        price: undefined,
        quantity: undefined,
    }

    const Schema = yup.object().shape({
        name: yup.string().required("Required*"),
        price: yup.number().min(0).required("Required*"),
        quantity: yup.number().min(0).required("Required*"),
        image: yup.mixed().required("Required*")
    })

    const renderData = [
        { name: "name", placeholder: "product Name", defaultValue: data?.name, },
        { name: "price", placeholder: "Price LKR", defaultValue: data?.price, options: { type: "number", } },
        { name: "quantity", placeholder: "Quantity", defaultValue: data?.quantity, options: { type: "number", } },
    ]

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    useEffect(() => {
        formik.values.name = data?.name
        formik.values.price = data?.price
        formik.values.quantity = data?.quantity
        formik.values.image = data?.image
        setImage(data?.image || defaultProduct)
    }, [data])

    return (
        <Dialog open={status} onClose={() => {
            formik.resetForm()
            setImage(defaultProduct)
            dispatch(dialogActions.hide("product"))
        }}  >
            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Product</DialogTitle>

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
                                    border: formik.touched.image && Boolean(formik.errors.image) ?  "2px solid red": "",
                                    borderRadius: 0.5,
                                }} >
                                <Avatar variant='square' src={image} sx={{ height: 125, width: 125, borderRadius: 0.5, }} />
                            </IconButton>
                        </label>
                    </Box>

                    {renderData.map((data, i) => {
                        return (
                            <Box key={i} mb={1} width={"100%"} >
                                <TextField
                                    variant="outlined"
                                    size='small'
                                    type="text"
                                    placeholder={data.placeholder}
                                    defaultValue={data.defaultValue}
                                    name={data.name}
                                    sx={style_txtbox}
                                    onChange={formik.handleChange}
                                    error={formik.touched[data.name] && Boolean(formik.errors[data.name])}
                                    onBlur={formik.handleBlur}
                                    {...data.options}
                                />
                            </Box>
                        )
                    })}

                    <Box display="flex" justifyContent="end">
                        <Button
                            variant='contained'
                            type="submit"
                            size="small"
                            sx={style_btn}>
                            {data === "create" ? "Create" : "Update"}
                        </Button>
                    </Box>

                </form>
            </DialogContent>

        </Dialog >
    )
}

export default Product

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
    bgcolor: "secondary.main",
    color: "white",
    ":hover": {
        bgcolor: "secondary.light",
    }
}
