import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';

const Loan = () => {

  const loanDetails = [
    {
      id: 1,
      name: "default",
      startPrice: 0,
      endPrice: 15000,
      interest: 0,
      installment: 3
    },
    {
      id: 2,
      name: "basic",
      startPrice: 15000,
      endPrice: 25000,
      interest: 3,
      installment: 3
    },
    {
      id: 3,
      name: "medium",
      startPrice: 25000,
      endPrice: 50000,
      interest: 5,
      installment: 3
    },
    {
      id: 4,
      name: "pro",
      startPrice: 50000,
      endPrice: 100000,
      interest: 10,
      installment: 4
    },
  ]

  const columns = [
    { field: 'id', headerName: 'ID', width: 130, headerAlign: "center", align: 'center' },
    { field: 'name', headerName: 'Loan name', width: 130, headerAlign: "center", align: 'center' },
    { field: 'startPrice', headerName: 'Start Price', width: 130, headerAlign: "center", align: 'center' },
    { field: 'endPrice', headerName: 'End Price', width: 130, headerAlign: "center", align: 'center' },
    { field: 'interest', headerName: 'interest (%)', width: 130, headerAlign: "center", align: 'center' },
    { field: 'installment', headerName: 'installment steps', width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'edit', headerName: 'Edit', width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }}>
          <Edit fontSize='small' sx={{ color: "#FF8B03 !important" }} />
        </IconButton>
      )
    },
    {
      field: 'delete', headerName: 'Delete', width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton size='small' sx={{ color: "red", bgcolor: "#3B3B3B !important" }}>
          <Delete fontSize='small' sx={{ color: "red !important" }} />
        </IconButton>
      )
    },
  ];


  return (
    <Box width="100%" >
      <BreadCrumbs />

      <Box display="flex" justifyContent="end" mr={5}>
        <Button size='small' variant='contained'   >
          <Typography fontSize={15} fontWeight={600} color="white"> Add  </Typography>
          <Add fontSize='small' sx={{ color: "white" }} />
        </Button>
      </Box>
      
    
      <Box mt={2}>
        <DataGrid
          rows={loanDetails}
          columns={columns}
          autoHeight={true}
          hideFooter={true}
          componentsProps={{
            columnMenu: {
              sx: {
                bgcolor: "#3B3B3B",
                ".MuiButtonBase-root": {
                  color: "white"
                }
              }
            }
          }}
          sx={tableStyle}
        />
      </Box>

    </Box>
  )
}

export default Loan

const tableStyle = {
  mx: "auto",
  width: "90vw",
  color: "white",
  ".MuiSvgIcon-root": {
    color: "white"
  },
  ".MuiDataGrid-cell": {
    borderColor: "black"
  },
  borderRadius: 0.3,
}