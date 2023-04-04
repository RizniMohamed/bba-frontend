import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upadatePass, upadatePerson } from '../Services/person'
import { messageActions } from '../Store/messageSlice'

import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Box } from '@mui/system'
import * as yup from 'yup'
import { dialogActions } from '../Store/dialogSlice'

const initVals = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
}

const Schema = yup.object().shape({
    currentPassword: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
    newPassword: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
    confirmPassword: yup.string().required("Required*").oneOf([yup.ref('newPassword')], 'Password not match.')
})

const ChangePassword = () => {

    const dispatch = useDispatch()
    const { status, data, onSubmit: loadData } = useSelector(state => state.dialog.changePassword)

    const update = async (inVals) => {
        console.log('data', data)
        console.log('inVals', inVals)

        if (inVals.currentPassword !== data.password) {
            dispatch(messageActions.show(["Password is incorrect", "error"]))
            return
        }

        let send = {
            password: inVals.newPassword
        }

        const { data: res, status } = await upadatePass(data.id, send);
        if (status !== 200) {
            dispatch(messageActions.show([res, "error"]))
            return
        }
        dispatch(messageActions.show([res]))
        loadData()
        dispatch(dialogActions.hide("changePassword"))
    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: update,
        validationSchema: Schema,
    })


    return (
        <Dialog open={status} onClose={() => {
            formik.resetForm()
            dispatch(dialogActions.hide("changePassword"))
        }}  >
            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Password</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, py: 0, width: 300 }}>
                <form onSubmit={formik.handleSubmit}>

                    <Box mb={1.5} width={"100%"} >
                        <TextField
                            variant="outlined"
                            size='small'
                            type="password"
                            placeholder='Current Password'
                            name='currentPassword'
                            sx={style_txtbox}
                            onChange={formik.handleChange}
                            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                            onBlur={formik.handleBlur}
                        />
                    </Box>

                    <Box mb={1.5} width={"100%"} >
                        <TextField
                            variant="outlined"
                            size='small'
                            type="password"
                            placeholder='New Password'
                            name='newPassword'
                            sx={style_txtbox}
                            onChange={formik.handleChange}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            onBlur={formik.handleBlur}
                        />
                    </Box>

                    <Box width={"100%"} >
                        <TextField
                            variant="outlined"
                            size='small'
                            type="password"
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            sx={style_txtbox}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            onBlur={formik.handleBlur}
                        />
                    </Box>

                    <Box display="flex" justifyContent="end">
                        <Button
                            variant='contained'
                            type="submit"
                            sx={style_btn}
                        >
                            Update
                        </Button>
                    </Box>
                </form>
            </DialogContent>

        </Dialog >

    )
}

export default ChangePassword


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