import { Autocomplete, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import SellerCard from '../../Components/SellerCard'
import SearchIcon from '@mui/icons-material/Search';

const Customer = () => {

  const data = [
    {
      name: "CID",
      value: "st20267816",
    },
    {
      name: "Name",
      value: "Rizni",
    },
    {
      name: "Shop Name",
      value: "B8 Bee",
    },
    {
      name: "DOB",
      value: "2022.02.02",
    },
    {
      name: "Contact",
      value: "775824807",
    },
  ]

  const data2 = [
    {
      name: "CID",
      value: "st123123",
    },
    {
      name: "Name",
      value: "Rizni",
    },
    {
      name: "Shop Name",
      value: "B8 Bee",
    },
    {
      name: "DOB",
      value: "2022.02.02",
    },
    {
      name: "Contact",
      value: "775824807",
    },
  ]

  const [list, setList] = useState([data, data2, data, data, data, data, data, data, data, data, data, data, data, data, data, data, data, data, data, data])

  return (
    <Box>
      <Box display="flex" justifyContent="center" my={2}>
        <Autocomplete
          size='small'
          options={list}
          freeSolo
          // onChange={(e, value) => formik.values[data.value] = value.value}
          getOptionLabel={option => option[0].value}
          PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
          sx={{ minWidth: 240, width: "25%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: "100px !important" } }}
          renderInput={(params) => (
            < TextField
              {...params}
              InputProps={{ ...params.InputProps, startAdornment: <SearchIcon sx={{ color: "#ababab" }} /> }}
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
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {list.map((c, i) => {
          return <SellerCard key={i} data={c} />
        })}
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