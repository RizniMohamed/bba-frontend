import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { messageActions } from '../Store/messageSlice';
import { getAllPersons } from '../Services/person';
import { sendMail } from '../Services/mail';

const OTP = () => {

  const { status } = useSelector(state => state.dialog.OTP)
  const dispatch = useDispatch()
  const [OTP, setOTP] = useState(undefined)

  const initVals = {
    email: "",
    OTP: "",
  }

  const Schema = yup.object().shape({
    email: yup.string().required("Required*").email("Email must be in valid format"),
    OTP: yup.number(),
  })

  const onSubmit = async (data) => {

    //check user
    const { data: userData } = await getAllPersons()

    let validUser = userData.filter(p => p.email === data.email)
    if (validUser.length === 0) {
      dispatch(messageActions.show(["Invalid Email", "error"]))
      return
    }
    // //prepare email data
    const email_data = {
      to: data.email,
      OTP: Math.floor(Math.random() * 100000)
    };

    // send OTP
    if (!OTP) {
      try {
        const res = await sendMail(email_data)
        if (res === "OK") {
          setOTP(email_data.OTP)
          dispatch(messageActions.show(['Email has been sent successfully']))
        }
        else
          dispatch(messageActions.show([res, "error"]))

      } catch (error) {
        dispatch(messageActions.show([error.message, "error"]))
      }
    }

    // //verfy OTP
    if (OTP) {
      if (data.OTP) {
        if (Number.parseInt(data.OTP) !== OTP)
          dispatch(messageActions.show(["Invalid OTP", "error"]))
        else {
          dispatch(dialogActions.show(["updatePassword", , validUser]))
          dispatch(dialogActions.hide('OTP'))
        }
      } else {
        dispatch(messageActions.show(["OTP required", "error"]))
      }
    }

  }

  const renderData = [
    { name: "Email", value: "email", placeholder: "example@example.com", options: { type: "email" } },
    { name: "OTP", value: "OTP", placeholder: "OTP", options: { ype: "number", disabled: OTP ? false : true } },
  ]

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("OTP")); setOTP(undefined) }}  >
      <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Verfication</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, py: 0, width: 300 }}>
        <form onSubmit={formik.handleSubmit}>

          {renderData.map((data, i) => {
            if (!OTP && data.name === "OTP") return <></>
            if (OTP && data.name === "Email") return <></>
            return (
              <Box key={i} mb={1} width={"100%"} >
                <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                <Box key={i} mb={1} width={"100%"} >
                  <TextField
                    variant="outlined"
                    size='small'
                    type="text"
                    placeholder={data.placeholder}
                    name={data.value}
                    sx={style_txtbox}
                    onChange={formik.handleChange}
                    error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                    onBlur={formik.handleBlur}
                    {...data.options}
                  />
                </Box>
              </Box>
            )
          })}

          <Box display="flex" justifyContent="end">
            <Button
              variant='contained'
              type="submit"
              size="small"
              sx={style_btn}>
              {OTP ? "Verify" : "Send"}
            </Button>
          </Box>

        </form>
      </DialogContent>

    </Dialog >
  )
}


export default OTP


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
const style_txtbox = {
  width: "100%",
  ".MuiOutlinedInput-root": {
    bgcolor: "#3B3B3B",
    borderRadius: 10
  }
}