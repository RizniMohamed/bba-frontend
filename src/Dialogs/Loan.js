import React, { useEffect, useState } from 'react'
import { dialogActions } from '../Store/dialogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, Button, TextField, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { messageActions } from "../Store/messageSlice"
// import { sendMail } from '../../services/mail'
// import { getUser_FP } from '../../services/user'

const Loan = () => {
    const dispatch = useDispatch()
    const { status, data, onSubmit } = useSelector(state => state.dialog.loan)

    const initVals = {
        name: undefined,
        startPrice: undefined,
        endPrice: undefined,
        interest: undefined,
        installmentSteps: undefined
    }




    const Schema = yup.object().shape({
        name: yup.string().required("Required*"),
        startPrice: yup.number().min(0).required("Required*"),
        endPrice: yup.number().min(0).test({
            test: (value, context) => value > parseInt(context.parent.startPrice),
        }).required("Required*"),
        interest: yup.number().min(0).required("Required*"),
        installmentSteps: yup.number().min(3).required("Required*"),
    })

    const renderData = [
        { name: "name", placeholder: "Loan Name", defaultValue: data?.name, },
        { name: "startPrice", placeholder: "Start Price LKR", defaultValue: data?.startPrice, options: { type: "number", } },
        { name: "endPrice", placeholder: "End Price LKR", defaultValue: data?.endPrice, options: { type: "number", } },
        { name: "interest", placeholder: "Interest (%)", defaultValue: data?.interest, options: { type: "number", } },
        { name: "installmentSteps", placeholder: "Installment Steps", defaultValue: data?.installment, options: { type: "number", } },
    ]

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    useEffect(() => {
        formik.values.name = data?.name
        formik.values.startPrice = data?.startPrice
        formik.values.endPrice = data?.endPrice
        formik.values.interest = data?.interest
        formik.values.installmentSteps = data?.installment
    }, [data, formik.values, formik])


    return (
        <Dialog open={status} onClose={() => {
            formik.resetForm()
            dispatch(dialogActions.hide("loan"))
        }}  >
            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Loan</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, py: 0, width: 300 }}>
                <form onSubmit={formik.handleSubmit}>

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

export default Loan

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
