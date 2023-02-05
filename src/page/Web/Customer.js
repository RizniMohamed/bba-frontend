import { Autocomplete, InputAdornment, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import CustomerCard from '../../Components/CustomerCard'
import SearchIcon from '@mui/icons-material/Search';

const Customer = () => {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

  return (
    <Box>
      <Box display="flex" justifyContent="center" my={2}>
        <Autocomplete
          size='small'
          options={list}
          freeSolo
          // onChange={(e, value) => formik.values[data.value] = value.value}
          getOptionLabel={option => option}
          PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
          sx={{ width: "25%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: "100px !important" } }}
          renderInput={(params) => (
            < TextField
              {...params}
              InputProps={{ startAdornment: <SearchIcon sx={{color:"#ababab"}} /> }}
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
          return <CustomerCard key={i} />
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