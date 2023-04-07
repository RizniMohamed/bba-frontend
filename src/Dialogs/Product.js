import { Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Input, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import defaultProduct from '../LocalData/image/default_product.png'
import { createProduct, upadateProduct } from '../Services/product'
import { dialogActions } from '../Store/dialogSlice'
import { messageActions } from '../Store/messageSlice'

const initVals = {
    image: undefined,
    name: undefined,
    price: undefined,
    quantity: undefined,
    category: undefined,
    brand: undefined,
}

const Product = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const { status, data, onSubmit } = useSelector(state => state.dialog.product)
    const [image, setImage] = useState(defaultProduct)
    const [loading, setLoading] = useState(false)

    const handleAvatarChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
            formik.values.image = base64
            setImage(URL.createObjectURL(e.target.files[0]))
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const Schema = yup.object().shape({
        name: yup.string().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        brand: yup.string().required(),
        quantity: yup.number().required(),
        image: yup.mixed().required()
    })

    const renderData = [
        { name: "name", placeholder: "Product Name", defaultValue: data?.name, },
        { name: "category", placeholder: "Category", defaultValue: data?.category, },
        { name: "brand", placeholder: "Brand", defaultValue: data?.brand, },
        { name: "price", placeholder: "Price LKR", defaultValue: data?.price, options: { type: "number", inputProps: { step: 0.01 } } },
        { name: "quantity", placeholder: "Quantity", defaultValue: data?.quantity, options: { type: "number", } },
    ]

    const create = async (inVals) => {
        setLoading(true)

        inVals['shopID'] = auth.shopID
        const { data, status } = await createProduct(inVals);
        if (status !== 200) {
            dispatch(messageActions.show([data, "error"]))
            setLoading(false)
            return
        }
        setLoading(false)
        dispatch(messageActions.show([data]))
        onSubmit()
        dispatch(dialogActions.hide("product"))
    }

    const update = async (inVals) => {
        setLoading(true)
        const { data: productData, status } = await upadateProduct(data.id, inVals);
        if (status !== 200) {
            dispatch(messageActions.show([productData, "error"]))
            setLoading(false)
            return
        }
        setLoading(false)
        dispatch(messageActions.show([productData]))
        onSubmit()
        dispatch(dialogActions.hide("product"))
    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: data === "create" ? create : update,
        validationSchema: Schema,
    })

    useEffect(() => {
        formik.values.name = data?.name
        formik.values.price = data?.price
        formik.values.quantity = data?.quantity
        formik.values.image = data?.image
        formik.values.category = data?.category
        formik.values.brand = data?.brand
        setImage(data?.image || defaultProduct)
    }, [data])

    return (
        <Dialog open={status} onClose={() => {
            formik.resetForm()
            setImage(defaultProduct)
            setLoading(false)
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
                                    border: formik.touched.image && Boolean(formik.errors.image) ? "2px solid red" : "",
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
                        {!loading ? <Button
                            variant='contained'
                            type="submit"
                            size="small"
                            sx={style_btn}>
                            {data === "create" ? "Create" : "Update"}
                        </Button> : <CircularProgress sx={{ my: 2, mr: 2, width: "100%" }} size={25} />}
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
