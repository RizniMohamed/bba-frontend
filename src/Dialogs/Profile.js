import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upadatePerson } from '../Services/person'
import { messageActions } from '../Store/messageSlice'

import { Help } from '@mui/icons-material'
import { Avatar, Button, CircularProgress, Dialog, DialogContent, IconButton, Input, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { differenceInYears } from 'date-fns'
import * as yup from 'yup'
import { dialogActions } from '../Store/dialogSlice'
import PopoverRole from './PopoverRole';

const initVals = {
    name: "",
    email: "",
    dob: "",
    contact: "",
    address: "",
    image: "",
}

const Schema = yup.object().shape({
    name: yup.string().required("Required*"),
    email: yup.string().required("Required*").email(),
    address: yup.string().required("Required*"),
    image: yup.mixed().required("Required*"),
    dob: yup.date().test("dob", "Should be greater than 18", value => differenceInYears(new Date(), new Date(value)) >= 18).required("Required*"),
    contact: yup.string().required("Required*").test("len", "Invalid Phone number", (val) => {
        if ((val?.length === 9)) return true
    }),
})
const Profile = () => {

    const dispatch = useDispatch()
    const { status, data, onSubmit: loadData } = useSelector(state => state.dialog.profile)

    const [image, setimage] = useState("")
    const [helpAnchor, setHelpAnchor] = useState(null);
    const [helpElement, setHelpElement] = useState(null);
    const [loading, setLoading] = useState(false)

    const formateDate = (date) => {
        if (!date) return
        const dateObj = new Date(date);
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const renderUserData = [
        { name: "Full Name", value: "name", defaultValue: data?.name, placeholder: "Full Name" },
        { name: "Email", value: "email", defaultValue: data?.email, placeholder: "Email", options: { type: "email" } },
        { name: "Contact", value: "contact", defaultValue: data?.contact, placeholder: "7X XX XX XXX", options: { type: "number" } },
        { name: "Date of Birth", value: "dob", defaultValue: formateDate(data?.dob), placeholder: "Date of Birth", options: { type: "date" }, helper: "Age need be above 18" },
        { name: "Address", value: "address", defaultValue: data?.address, placeholder: "Address" },
    ]

    const handleHelpRole = (event, value) => {
        setHelpAnchor(event.currentTarget)
        setHelpElement(value)
    };


    useEffect(() => {

        if (data) {
            setimage(data.image)
            formik.values.name = data?.name
            formik.values.email = data?.email
            formik.values.dob = formateDate(data?.dob)
            formik.values.image = data?.image
            formik.values.address = data?.address
            formik.values.contact = data?.contact
        }
    }, [data])


    const handleimageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
            formik.values.image = base64
            setimage(URL.createObjectURL(e.target.files[0]))
        };
        reader.readAsDataURL(e.target.files[0]);
    }


    const onSubmit = async (inputData) => {
        console.log('inputData', inputData)
        setLoading(true)
        inputData['roleID'] = data.roleID
        const { data: res, status } = await upadatePerson(data.id, inputData)
        if (status !== 200) {
            setLoading(false)
            dispatch(messageActions.show([res, "error"]))
            return
        }
        setLoading(false)
        dispatch(messageActions.show(["Profile updation succeed"]))
        loadData()
        dispatch(dialogActions.hide('profile'))
    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    return (
        <Dialog
            open={status} onClose={() => {
                formik.resetForm();
                dispatch(dialogActions.hide("profile"))
                setimage(false)
                setLoading(false)
            }} sx={style_dialog}>
            <Typography fontWeight={700} fontSize={34} sx={{ mt: 3, mb: 1 }} textAlign="center">Profile</Typography>
            <form onSubmit={formik.handleSubmit}>

                <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 5, width: 400 }}>


                    <Box display="flex" justifyContent="center" my={1}>
                        <label htmlFor="icon-button-file">
                            <Input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                name='image'
                                sx={{ display: 'none' }}
                                onChange={handleimageChange}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="span"
                                sx={{
                                    border: formik.touched.image && Boolean(formik.errors.image) ? "2px solid red" : "",
                                    borderRadius: 10,
                                }} >
                                <Avatar variant='rounded' src={image} sx={{ height: 125, width: 125, borderRadius: 10, }} />
                            </IconButton>
                        </label>
                    </Box>



                    {renderUserData.map((data, i) => {
                        return (
                            <Box key={i} mb={1} width={"100%"} >
                                {data.helper ?
                                    <Box display="flex">
                                        <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                                        <IconButton sx={{ p: 0, m: 0, ml: 0.5, mb: 0.5 }} onClick={(e) => handleHelpRole(e, data.value)}>
                                            <Help fontSize='small' sx={{ color: "primary.main" }} />
                                        </IconButton>
                                        {data.value === helpElement && <PopoverRole anchor={helpAnchor} setAnchor={setHelpAnchor} text={data.helper} />}
                                    </Box> : <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                                }

                                <TextField
                                    variant="outlined"
                                    size='small'
                                    type="text"
                                    placeholder={data.placeholder}
                                    defaultValue={data.defaultValue}
                                    name={data.value}
                                    sx={style_txtbox}
                                    onChange={formik.handleChange}
                                    error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                                    onBlur={formik.handleBlur}
                                    {...data.options}
                                />
                            </Box>
                        )
                    })}

                    {loading && <CircularProgress sx={{ mx: "auto", width: "100%" }} size={30} />}

                    {!loading && <Box display="flex" justifyContent="end">
                        <Button
                            variant='contained'
                            type="submit"
                            sx={style_btn}
                        >
                            Update
                        </Button>
                    </Box>}

                </DialogContent>

            </form>
        </Dialog >
    )
}

export default Profile


const style_txtbox = {
    width: "100%",
    ".MuiOutlinedInput-root": {
        bgcolor: "#3B3B3B",
        borderRadius: 10
    }
}


const style_dialog = {
    "& .MuiPaper-root": { px: 2 }
}


const style_btn = {
    mt: 2,
    mb: 2,
    minWidth: 100,
    // bgcolor: "secondary.main",
    color: "white",
}