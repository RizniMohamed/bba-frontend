import { Autocomplete, Avatar, Box, Button, CircularProgress, Dialog, DialogContent, Divider, IconButton, Input, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { dialogActions } from '../Store/dialogSlice';
import HelpIcon from '@mui/icons-material/Help';
import PopoverRole from './PopoverRole';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import { signup } from '../Services/user';
import { messageActions } from '../Store/messageSlice';
import differenceInYears from "date-fns/differenceInYears";

const initVals = {
  name: "",
  email: "",
  dob: "",
  contact: "",
  address: "",
  password: "",
  confirmPassword: "",
  image: "",
  roleID: "",

  shopName: "",
  shopAddress: "",
  shopImage: "",
}

const SchemaSeller = yup.object().shape({
  name: yup.string().required("Required*"),
  email: yup.string().required("Required*").email(),
  shopName: yup.string().required("Required*"),
  address: yup.string().required("Required*"),
  roleID: yup.number().required("Required*"),
  shopAddress: yup.string().required("Required*"),
  shopImage: yup.mixed().required("Required*"),
  image: yup.mixed().required("Required*"),
  dob: yup.date().test("dob", "Should be greater than 18", value => differenceInYears(new Date(), new Date(value)) >= 18).required("Required*"),
  contact: yup.string().required("Required*").test("len", "Invalid Phone number", (val) => {
    if ((val?.length === 9)) return true
  }),
  password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
    "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const SchemaBuyer = yup.object().shape({
  name: yup.string().required("Required*"),
  email: yup.string().required("Required*").email(),
  address: yup.string().required("Required*"),
  roleID: yup.number().required("Required*"),
  image: yup.mixed().required("Required*"),
  dob: yup.date().test("dob", "Should be greater than 18", value => differenceInYears(new Date(), new Date(value)) >= 18).required("Required*"),
  contact: yup.string().required("Required*").test("len", "Invalid Phone number", (val) => {
    if ((val?.length === 9)) return true
  }),
  password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
    "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const renderUserData = [
  { name: "Full Name", value: "name", placeholder: "Full Name" },
  { name: "Email", value: "email", placeholder: "Email", options: { type: "email" } },
  { name: "Contact", value: "contact", placeholder: "7X XX XX XXX", options: { type: "number" } },
  { name: "Date of Birth", value: "dob", placeholder: "Date of Birth", options: { type: "date" }, helper: "Age need be above 18" },
  { name: "Address", value: "address", placeholder: "Address" },
  { name: "Password", value: "password", placeholder: "Password", options: { type: "password" }, helper: "Required: One capital letter (A-Z) | One small letter (a-z) | One number (0-9) | 8 in length " },
  { name: "Confrim Password", value: "confirmPassword", placeholder: "Confirm Password", options: { type: "password" } },
]

const renderShopData = [
  { name: "Shop Name", value: "shopName", placeholder: "Shop Name", },
  { name: "Address", value: "shopAddress", placeholder: "Address" },
]

const Signup = () => {
  const { status } = useSelector(state => state.dialog.signup)
  const dispatch = useDispatch()

  const [shopImage, setShopImage] = useState("")
  const [image, setimage] = useState("")
  const [helpAnchor, setHelpAnchor] = useState(null);
  const [helpElement, setHelpElement] = useState(null);
  const [loading, setLoading] = useState(false)

  const [section, setSection] = useState(1)
  const [sectionMax, setSectionMax] = useState(2)
  const [roleID, setRoleID] = useState(3)

  const handleHelpRole = (event, value) => {
    setHelpAnchor(event.currentTarget)
    setHelpElement(value)
  };

  const handleShopImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
      formik.values.shopImage = base64
      setShopImage(URL.createObjectURL(e.target.files[0]))
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleimageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
      formik.values.image = base64
      setimage(URL.createObjectURL(e.target.files[0]))
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleNextSection = () => setSection(section + 1)
  const handleBackSection = () => setSection(section - 1)

  const onSubmit = async (inputData) => {
    setLoading(true)
    // inputData['roleID'] = 2 // seller
    const { data, status } = await signup(inputData)
    if (status !== 200) {
      setLoading(false)
      dispatch(messageActions.show([data, "error"]))
      return
    }
    setLoading(false)
    dispatch(messageActions.show(["Registeration succeed"]))
    dispatch(messageActions.show(["Please login"]))
    dispatch(dialogActions.hide('signup'))
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: roleID === 3 ? SchemaBuyer : SchemaSeller,
  })

  const roleList = [
    { name: "Seller", value: 2 },
    { name: "Buyer", value: 3 },
  ]

  return (
    <Dialog
      open={status} onClose={() => {
        formik.resetForm();
        dispatch(dialogActions.hide("signup"))
        setShopImage(false)
        setimage(false)
        setSection(1)
        setLoading(false)
      }} sx={style_dialog}>
      <Typography fontWeight={700} fontSize={34} sx={{ mt: 3, mb: 1 }} textAlign="center">Register</Typography>
      <form onSubmit={formik.handleSubmit}>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 5, width: 400 }}>

          {section === 1 && (
            <>
              <Divider sx={{ "&::before, &::after": { borderColor: "white" } }}>User</Divider>

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
                          <HelpIcon fontSize='small' sx={{ color: "primary.main" }} />
                        </IconButton>
                        {data.value === helpElement && <PopoverRole anchor={helpAnchor} setAnchor={setHelpAnchor} text={data.helper} />}
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

              <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Role</Typography>
              <Autocomplete
                size='small'
                options={roleList}
                freeSolo
                onChange={(e, { value }) => {
                  if (parseInt(value) === 2)
                    setSectionMax(2)
                  else
                    setSectionMax(1)
                  setRoleID(value)
                  formik.values.roleID = value
                }}
                getOptionLabel={option => option.name}
                PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                renderInput={(params) => (
                  < TextField
                    {...params}
                    InputProps={{ ...params.InputProps }}
                    placeholder="RoleID"
                    error={formik.touched.roleID && Boolean(formik.errors.roleID)}
                    onBlur={formik.handleBlur}
                    sx={{
                      ".MuiOutlinedInput-root": {
                        bgcolor: "#3B3B3B",
                        borderRadius: 10,
                        color: "white"
                      }
                    }}
                  />
                )}
              />


            </>
          )}


          {section === 2 && (
            <>
              <Divider sx={{ "&::before, &::after": { borderColor: "white" } }}>Shop</Divider>

              <Box display="flex" justifyContent="center" my={1}>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name='image'
                    sx={{ display: 'none' }}
                    onChange={handleShopImageChange}
                  />
                  <IconButton color="primary" aria-label="upload picture" component="span"
                    sx={{
                      border: formik.touched.shopImage && Boolean(formik.errors.shopImage) ? "2px solid red" : "",
                      borderRadius: 0.5,
                    }} >
                    <Avatar variant='square' src={shopImage} sx={{ height: 125, width: 125, borderRadius: 0.5, }} />
                  </IconButton>
                </label>
              </Box>

              {renderShopData.map((data, i) => {
                return (
                  <Box key={i} mb={1} width={"100%"} >
                    {data.name === "Password" ?
                      <Box display="flex">
                        <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                        <IconButton sx={{ p: 0, m: 0, ml: 0.5, mb: 0.5 }} onClick={handleHelpRole}>
                          <HelpIcon fontSize='small' sx={{ color: "primary.main" }} />
                        </IconButton>
                        <PopoverRole anchor={helpAnchor} setAnchor={setHelpAnchor} text={
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
            </>
          )}


          {roleID === 2 && (
            <Box display="flex" justifyContent="space-between" mt={1}>
              <IconButton onClick={handleBackSection} disabled={section <= 1 ? true : false}>
                <ArrowBackIosRounded fontSize='medium' sx={{ color: section <= 1 ? "gray" : "primary.main" }} />
              </IconButton>
              <IconButton onClick={handleNextSection} disabled={section >= sectionMax ? true : false}>
                <ArrowForwardIosRounded fontSize='medium' sx={{ color: section >= 2 ? "gray" : "primary.main" }} />
              </IconButton>
            </Box>
          )}

          {loading && <CircularProgress sx={{ mx: "auto", width: "100%" }} size={30} />}

          {section === sectionMax && !loading && <Button
            variant='contained'
            type="submit"
            sx={{ width: 180, alignSelf: "center", color: "white", mt: 3, mb: 1 }}>
            Sign Up
          </Button>}

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


const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}