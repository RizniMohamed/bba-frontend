import { Box, Button, Dialog, DialogContent, IconButton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { dialogActions } from '../Store/dialogSlice';
import HelpIcon from '@mui/icons-material/Help';
import PopoverRole from './PopoverRole';

const initVals = {
  fullName: "",
  email: "",
  shopname: "",
  mobile: "",
  password: "",
  confirmPassword: "",
}

const Schema = yup.object().shape({
  fullName: yup.string().required("Required*"),
  email: yup.string().required("Required*").email("Email must be in valid format"),
  shopname: yup.string().required("Required*"),
  mobile: yup.string().required("Required*").test("len", "Invalid Phone number", (val) => {
    if ((val?.length === 9)) return true
  }),
  password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
    "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const renderData = [
  { name: "Full Name", value: "fullName", placeholder: "Full Name" },
  { name: "Email", value: "email", placeholder: "Email", options: { type: "email" } },
  { name: "Shop Name", value: "shopname", placeholder: "Shop Name", },
  { name: "Mobile", value: "mobile", placeholder: "7X XX XX XXX", options: { type: "number" } },
  { name: "Password", value: "password", placeholder: "Password", options: { type: "password" } },
  { name: "Confrim Password", value: "confirmPassword", placeholder: "Confirm Password", options: { type: "password" } },
]

const Signup = () => {
  const { status } = useSelector(state => state.dialog.signup)
  const dispatch = useDispatch()

  const [helpRoleAnchor, setHelpRoleAnchor] = useState(null);

  const handleHelpRole = (event) => setHelpRoleAnchor(event.currentTarget);


  const onSubmit = async (inputData) => {
    alert("Signup Success")
    console.log(inputData)
    // const { data, status } = await singupUser(inputData)
    // if (status !== 200) {
    //   setMsg({ variant: "red", msg: data })
    //   return
    // }

    // setMsg({ variant: "green", msg: "Registeration Succeed" })
    // dispatch(dialogActions.hide('signup'))

  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <Dialog
      open={status} onClose={() => { formik.resetForm(); dispatch(dialogActions.hide("signup")) }} sx={style_dialog}>
      <Typography fontWeight={700} fontSize={34} sx={{ mt: 3, mb: 1 }} textAlign="center">Register</Typography>
      <form onSubmit={formik.handleSubmit}>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 5, width: 400 }}>

          {renderData.map((data, i) => {
            return (
              <Box key={i} mb={1} width={"100%"} >
                {data.name === "Password" ?
                  <Box display="flex">
                   <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                    <IconButton sx={{ p: 0, m: 0, ml: 0.5, mb: 0.5 }} onClick={handleHelpRole}>
                      <HelpIcon fontSize='small' sx={{ color: "primary.main" }} />
                    </IconButton>
                    <PopoverRole anchor={helpRoleAnchor} setAnchor={setHelpRoleAnchor} text={
                      "Required: One capital letter (A-Z) | One small letter (a-z) | One number (0-9) | 8 in length "
                    } />
                  </Box> : <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                }
                
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
            )
          })}

          <Button
            variant='contained'
            type="submit"
            sx={{ width: 180, alignSelf: "center", color: "white", mt: 3, mb: 1 }}>
            Sign Up
          </Button>

        </DialogContent>

      </form>
    </Dialog >
  )
}

export default Signup

const style_dialog = {
  "& .MuiPaper-root": { px: 2 }
}

const style_txtbox = {
  width: "100%",
  ".MuiOutlinedInput-root": {
    bgcolor: "#3B3B3B",
    borderRadius: 10,
    color: "white"
  }
}
