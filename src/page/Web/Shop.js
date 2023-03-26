import { Login, Search } from '@mui/icons-material';
import { Autocomplete, Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from "../../Components/ProductCard";
const Shop = () => {

  const navigate = useNavigate()

  const categoryList = [
    { name: "Cat a", value: 'a' },
    { name: "Cat b", vblue: 'b' },
    { name: "Cat c", value: 'c' },
    { name: "Cat d", value: 'd' },
    { name: "Cat e", value: 'e' },
    { name: "Cat f", value: 'f' },
    { name: "Cat g", value: 'g' },
  ]

  const ProductList = [
    {
      name: "Product product muham A",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1200
    },
    {
      name: "Product product muham B",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1254
    },
    {
      name: "Product product muham C",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 8452
    },
    {
      name: "Product product muham D",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 4569
    },
    {
      name: "Product product muham E",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 4895
    },
    {
      name: "Product product muham F",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 5658
    },
    {
      name: "Product product muham G",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 2456
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
    {
      name: "Product product muham H",
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7895
    },
  ]

  return (

    <Box p={2}>

      <Box width="100%" height={100} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
        <Typography textAlign="center" fontSize={40} fontWeight={700} sx={{ color: "primary.main" }}>Bubmble Bee</Typography>
        <Typography textAlign="center" fontSize={16} fontWeight={600}>Buy Now, Pay Later</Typography>
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Autocomplete
          size='small'
          options={categoryList}
          freeSolo
          // onChange={(e, value) => formik.values[data.value] = value.value}
          getOptionLabel={option => option.name}
          PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
          sx={{ minWidth: 500, width: "25%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: "100px !important" } }}
          renderInput={(params) => (
            < TextField
              {...params}
              InputProps={{ ...params.InputProps, startAdornment: <Search sx={{ color: "#ababab" }} /> }}
              name="search"
              placeholder="Search"
              // error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
              // onBlur={formik.handleBlur}
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

        <Box position="absolute" sx={{ transform: "translate(38vw,0)" }}>
          <Button variant='contained' onClick={() => navigate("login")}  >
            <Typography fontSize={15} fontWeight={600} color="white"> Login  </Typography>
            <Login fontSize='medium' sx={{ color: "white" }} />
          </Button>
        </Box>

      </Box>

      <Box display="flex" flexWrap="wrap" height={510} mt={3} mx="6vw" >
        {ProductList.map((c, i) => {
          return <ProductCard key={i} data={c} />
        })}
      </Box>


      {/* Footer */}
      <Typography textAlign="center" mx="auto" mt={2} fontSize={14} fontWeight={500} color="primary.main"> 2023 Bubmble Bee All Rights Reserved  </Typography>
    </Box>

  )
}

export default Shop

const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}