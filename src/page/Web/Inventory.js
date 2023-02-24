import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import { messageActions } from '../../Store/messageSlice';

const Inventory = () => {

  const dispatch = useDispatch()

  const loanDetails = [
    {
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: 1,
      name: "default",
      price: 1550,
      quantity: 10,
    },
    {
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: 2,
      name: "Apple ring titatinum polished",
      price: 1550,
      quantity: 12,
    },
    {
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: 3,
      name: "medium",
      price: 1550,
      quantity: 15,
    },
    {
      image: "https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: 4,
      name: "pro",
      price: 1550,
      quantity: 14,
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
    { field: 'price', headerName: 'Price LKR', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'quantity', headerName: 'Quantity', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'edit', headerName: 'Edit', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)} size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }}>
          <Edit fontSize='small' sx={{ color: "#FF8B03 !important" }} />
        </IconButton>
      )
    },
    {
      field: 'delete', headerName: 'Delete', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row)} size='small' sx={{ color: "red", bgcolor: "#3B3B3B !important" }}>
          <Delete fontSize='small' sx={{ color: "red !important" }} />
        </IconButton>
      )
    },
  ];

  const handleDelete = row => {
    dispatch(dialogActions.show([
      "delete",
      (formData) => {
        dispatch(messageActions.show(['Product deleted successfully']))
      },
      "Are you sure do you want to delete this product? All purchaes assoicated with this product will also deleted"
    ]))
    console.log(row);
  }

  const handleEdit = row => {
    dispatch(dialogActions.show([
      "product",
      (formData) => {
        alert("Updated " + row.id)
      },
      row
    ]))
    console.log(row);
  }


  const handleAdd = () => {
    dispatch(dialogActions.show([
      "product",
      () => {
        dispatch(messageActions.show(['Product created successfully']))
      },
      "create"
    ]))
  }

  return (
    <Box width="100%" >
      <BreadCrumbs />

      <Box display="flex" justifyContent="end" mr={5}>
        <Button size='small' variant='contained' onClick={handleAdd}  >
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

export default Inventory

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

