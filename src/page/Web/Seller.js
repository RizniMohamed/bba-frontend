import { Autocomplete, CircularProgress, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SellerCard from '../../Components/SellerCard'
import SearchIcon from '@mui/icons-material/Search';
import { getShops } from '../../Services/shop';
import { useDispatch } from 'react-redux';
import { messageActions } from '../../Store/messageSlice';
import { Search } from '@mui/icons-material';

const Customer = () => {

  const [list, setList] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  const loadData = async () => {
    setLoading(true)
    const { status, data } = await getShops()
    if (status === 200) {
      setList(data)
      setFilteredProducts(data)
    } else {
      setList([])
      setFilteredProducts([])
    }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const filter = (e, val) => {
    console.log(e);
    if (val) {

      let newData = filteredProducts.filter(p => p.name === val.name)
      if (newData.length === 0) {
        setFilteredProducts(list)
        dispatch(messageActions.show(["No shops found", "error"]))
      } else {
        setFilteredProducts(newData)
      }
    }
    else
      setFilteredProducts(list)
  }



  return (
    <Box width={"100%"}>
      <Box display="flex" justifyContent="center" my={2} >
        <Autocomplete
          size='small'
          options={filteredProducts}
          freeSolo
          onChange={filter}
          clearOnEscape={true}
          getOptionLabel={option => option.name || ""}
          PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
          sx={{ minWidth: 500, width: "25%", ".MuiOutlinedInput-root": { borderRadius: "100px !important" } }}
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

      </Box>

      <Box display="flex" flexWrap="wrap" mt={3} mx="6vw" >
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((c, i) => {
            return <SellerCard key={i} data={c} />
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

    </Box>
  )
}

export default Customer


const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}