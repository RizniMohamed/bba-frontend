import { Avatar, Button, IconButton, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';

const initVals = {
  name: "",
  address: "",
  mobile: "",
  image: "",
}

const Schema = yup.object().shape({
  name: yup.string().required("Required*"),
  address: yup.string().required("Required*"),
  mobile: yup.string().required("Required*"),
  image: yup.mixed().required("Required*"),
})

const onSubmit = (data) => {
  console.log(data);
}

const ProfileForm = () => {
  const [image, setImage] = useState("")

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  const handleAvatarChange = (e) => {
    formik.values.image = e.target.files[0]
    setImage(URL.createObjectURL(formik.values.image))
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        <Box display="flex" justifyContent="center">
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              name='image'
              sx={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <Avatar src={image} sx={{ height: 150, width: 150 }} />
            </IconButton>
          </label>
        </Box>

        <Box mb={1.5} width={"100%"} >
          <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Name</Typography>
          <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder='Full Name'
            name='name'
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mb={1.5} width={"100%"} >
          <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Address</Typography>
          <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder='Address'
            name='address'
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box width={"100%"} >
          <Typography fontWeight={700} fontSize={14} sx={{ ml: 1.5 }} >Mobile</Typography>
          <TextField
            variant="outlined"
            size='small'
            type="number"
            placeholder='Mobile'
            name='mobile'
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
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

export default ProfileForm