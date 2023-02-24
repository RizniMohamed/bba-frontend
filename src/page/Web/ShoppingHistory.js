import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit, Paid, Receipt, ShoppingBag } from '@mui/icons-material';

const ShoppingHistory = () => {

  const loanDetails = [
    {
      image: "",
      id: 1,
      name: "default",
      installemt: "2/3",
    },
    {
      image: "",
      id: 2,
      name: "basic",
      installemt: "2/3",
    },
    {
      image: "",
      id: 3,
      name: "medium",
      installemt: "2/5",
    },
    {
      image: "",
      id: 4,
      name: "pro",
      installemt: "2/3",
    },
  ]

  const columns = [
    {
      field: 'iamge', headerName: 'Image', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: ({ row: { image } }) => (
        <Avatar src={image} variant="rounded" sx={{ bgcolor: "#3B3B3B" }} />
      )
    },
    { field: 'id', headerName: 'ID', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'name', headerName: 'Name', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'installemt', headerName: 'Installemt', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'loan', headerName: 'Loan', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }}>
          <Paid fontSize='small' sx={{ color: "#FF8B03 !important" }} />
        </IconButton>
      )
    },
    {
      field: 'Payment', headerName: 'Payment', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }}>
          <Receipt fontSize='small' sx={{ color: "#FF8B03 !important" }} />
        </IconButton>
      )
    },

    {
      field: 'delete', headerName: 'Delete', flex: 1, width: 130, headerAlign: "center", align: 'center',
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

export default ShoppingHistory

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