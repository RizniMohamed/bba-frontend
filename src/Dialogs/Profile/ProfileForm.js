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


        <Box mt={1.5} width={"100%"} >
          <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder='Full Name'
            name='name'
            sx={style_txtbox}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mt={1.5} width={"100%"} >
          <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder='Address'
            name='address'
            sx={style_txtbox}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mt={1.5} width={"100%"} >
          <TextField
            variant="outlined"
            size='small'
            type="number"
            placeholder='Mobile'
            name='mobile'
            sx={style_txtbox}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            onBlur={formik.handleBlur}
          />
        </Box>



        <Box mt={1.5} width={"100%"} >
          <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder='Full Name'
            name='name'
            sx={style_txtbox}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mt={1.5} width={"100%"} >
          <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder='Address'
            name='address'
            sx={style_txtbox}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mt={1.5} width={"100%"} >
          <TextField
            variant="outlined"
            size='small'
            type="number"
            placeholder='Mobile'
            name='mobile'
            sx={style_txtbox}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
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
    </>

  )
}

export default ProfileForm


const style_txtbox = {
  width: 500,
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