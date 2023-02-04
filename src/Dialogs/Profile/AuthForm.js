import { Avatar, Button, IconButton, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';

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

const onSubmit = (data) => {
  console.log(data);
}

const AuthForm = () => {
  const [image, setImage] = useState("")

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })


  return (
    <>
      <form onSubmit={formik.handleSubmit}>


        <Box mb={1.5} width={"100%"} >
          <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Current Password</Typography>
          <TextField
            variant="outlined"
            size='small'
            type="password"
            placeholder='Current Password'
            name='currentPassword'
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
            onChange={formik.handleChange}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mb={1.5} width={"100%"} >
          <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >New Password</Typography>
          <TextField
            variant="outlined"
            size='small'
            type="password"
            placeholder='New Password'
            name='newPassword'
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box width={"100%"} >
          <Typography fontWeight={700} fontSize={14} sx={{ ml: 1.5 }} >Confirm Password</Typography>
          <TextField
            variant="outlined"
            size='small'
            type="password"
            placeholder='Confirm Password'
            name='confirmPassword'
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.mobile}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box display="flex" justifyContent="end">
          <Button
            variant='contained'
            type="submit"
            color='secondary'
            sx={{ width: 100, mt: 3, mb: 1 }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>

  )
}

export default AuthForm