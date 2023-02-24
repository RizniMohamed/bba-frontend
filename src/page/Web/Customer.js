import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate()

  const loanDetails = [
    {
      image : "",
      id: 1,
      name: "default",
      email : "mnriznimohamed@gmail.com",
      age: 0,
      contact: 15000,
    },
    {
      image : "",
      id: 2,
      name: "basic",
      email : "mnriznimohamed@gmail.com",
      age: 15000,
      contact: 25000,
    },
    {
      image : "",
      id: 3,
      name: "medium",
      email : "mnriznimohamed@gmail.com",
      age: 25000,
      contact: 50000,
    },
    {
      image : "",
      id: 4,
      name: "pro",
      email : "mnriznimohamed@gmail.com",
      age: 50000,
      contact: 100000,
    },
  ]

  const columns = [
    {
      field: 'iamge', headerName: 'Image', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: ({ row: { image } }) => (
        <>
          <Avatar src={image} variant="rounded" sx={{ bgcolor: "#3B3B3B" }} />
        </>
      )
    },
    { field: 'id', headerName: 'ID', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'name', headerName: 'Name', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'email', headerName: 'Email', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'age', headerName: 'Age', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'contact', headerName: 'Contact', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'shopHistroy', headerName: 'Shoping Histroy', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }} onClick={() => navigate("shopping history")} >
          <ShoppingBag fontSize='small' sx={{ color: "#FF8B03 !important" }} />
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

export default Profile

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