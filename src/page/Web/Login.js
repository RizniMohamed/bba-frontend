import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from '../../LocalData/image/logo.png'
import loginwall from '../../LocalData/image/loginwall.png'
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// import { loginUser } from '../../services/user';
// import { authActions } from '../../store/authSlice';

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let initVals = {
    email: "",
    password: ""
  }

  const Schema = yup.object().shape({
    email: yup.string().required("Required*").email("Email must be in valid format"),
    password: yup.string().required("Required*"),
  })

  const renderData = [
    { name: "Email", value: "email", placeholder: "example@example.com", options: { type: "email" } },
    { name: "Password", value: "password", placeholder: "password", options: { type: "password" } },
  ]

  const OnClick_CreateAccount = () => dispatch(dialogActions.show([ "signup" ]))
  const onClick_forgetPassword = () => dispatch(dialogActions.show([ "OTP" ]))

  const onSubmit = async ({ email, password }) => {
    const sendData = { email, password }
    alert("login success")
    console.log(sendData);
    // const { data, status } = await loginUser(sendData)

    // if (status !== 200) {
    //   setMsg({ variant: "red", msg: data })
    //   return
    // }

    // const authData = {
    //   role: data.user.role,
    //   userID: data.user._id,
    //   token: data.token,
    //   email: data.user.email,
    // }
    // dispatch(authActions.set(authData))
    // setMsg({ variant: "green", msg: "Login Succeed" })
    // navigate(`/${data.user.role}/home`)

  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <>
      <Box display="flex" p={0} m={0}>

        {/* left image */}
        <Box component="img" src={loginwall} alt='login Image' width="75%" height="100vh" />

        {/* right box */}
        <Box width="25%" display="flex" flexDirection="column" alignItems="center" >
          <Box component="img" src={logo} alt='login Image' width={200} height={200} my={5} />

          <Typography fontWeight={700} fontSize={34} sx={{ my: 0, color: "primary.main" }}  textAlign="center">Login</Typography>
          
          <form onSubmit={formik.handleSubmit}>

            <Box sx={{ display: "flex", flexDirection: "column", alignSelf: "center", width: 300, }}>

              {renderData.map((data, i) => {
                return (
                  <Box key={i} mb={1} width={"100%"} >
                    <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                    <TextField
                      variant="outlined"
                      size='small'
                      type="text"
                      placeholder={data.placeholder}
                      name={data.value}
                      onChange={formik.handleChange}
                      sx={{
                        width: "100%",
                        ".MuiOutlinedInput-root": {
                          bgcolor: "#3B3B3B",
                          borderRadius: 10,
                          color:"white"
                        }
                      }}
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
                size="medium"
                sx={{ width: 180, alignSelf: "center", color: "white", my: 2 }}>
                Login
              </Button>

            </Box >

          </form>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography color="white" fontWeight={400} sx={{ mr: 0.2 }}>Not registered yet?</Typography>
            <Button
              variant='text'
              size='small'
              onClick={OnClick_CreateAccount} >
              Create an Account
            </Button>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <Button
              variant='text'
              size='small'
              onClick={onClick_forgetPassword} >
              Forgot password?
            </Button>
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default Login