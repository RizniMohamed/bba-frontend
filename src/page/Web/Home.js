import { Login, Search } from '@mui/icons-material';
import { Autocomplete, Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from "../../Components/ProductCard";
import { getAllProducts } from '../../Services/product';
import { messageActions } from '../../Store/messageSlice';
const Home = () => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loadData = async () => {
    setLoading(true)
    const { status, data } = await getAllProducts()
    if (status === 200) {
      setProducts(data)
      setFilteredProducts(data)
    } else {
      setProducts([])
      setFilteredProducts([])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const filter = (e, val) => {
    console.log(e);
    if (val) {

      let newData = filteredProducts.filter(p => p.name === val.name)
      if (newData.length === 0) {
        setFilteredProducts(products)
        dispatch(messageActions.show(["No products found", "error"]))
      } else {
        setFilteredProducts(newData)
      }
    }
    else
      setFilteredProducts(products)
  }


  return (

    <Box p={2}>

      <Box width="100%" height={100} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
        <Typography textAlign="center" fontSize={40} fontWeight={700} sx={{ color: "primary.main" }}>Bubmble Bee</Typography>
        <Typography textAlign="center" fontSize={16} fontWeight={600}>Buy Now, Pay Later</Typography>
      </Box>


      <Box display="flex" justifyContent="center" mt={2}>
        <Autocomplete
          size='small'
          options={filteredProducts}
          freeSolo
          onChange={filter}
          clearOnEscape={true}
          getOptionLabel={option => option.name || ""}
          PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
          sx={{ minWidth: 500, width: "25%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: "100px !important" } }}
          renderInput={(params) => (
            < TextField
              {...params}
              InputProps={{ ...params.InputProps, startAdornment: <Search sx={{ color: "#ababab" }} /> }}
              name="search"
              placeholder="Search"
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

      <Box display="flex" flexWrap="wrap" mt={3} mx="6vw" >
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((c, i) => {
            return <ProductCard key={i} data={c} />
          })
        ) : (
          loading ? (
            <CircularProgress sx={{ mx: "auto", color: "white", my: 2 }} size={25} />
          ) : (
            <Typography mx="auto" mt={2} fontSize={14} sx={{
              position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100,
              pointerEvents: 'none',
            }} fontWeight={500} color="primary.main"> No Products :( </Typography>
          )
        )}
      </Box>


      {/* Footer */}
      <Typography textAlign="center" sx={{
        marginTop: 'calc(10% + 60px)', width: "100%",
        position: 'fixed', bottom: 20,
      }}
        mt={2} fontSize={14} fontWeight={500} color="primary.main">2023 Bubmble Bee All Rights Reserved</Typography>
    </Box>

  )
}

export default Home

const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}