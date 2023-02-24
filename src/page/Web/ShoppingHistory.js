import { Avatar, Box, Button, IconButton, Slider, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit, Paid, Receipt, ShoppingBag } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import defaultProduct from '../../LocalData/image/default_product.png'

const ShoppingHistory = () => {
  const dispatch = useDispatch()

  const ShoppingHistroy = [
    {
      image: defaultProduct,
      id: 1,
      name: "default",
      installemt_total: 3,
      installment_paid: 2,
      product_price: 12554,
      paid: 4556,
    },
    {
      image: defaultProduct,
      id: 2,
      name: "basic",
      installemt_total: 3,
      installment_paid: 3,
      product_price: 12554,
      paid: 4556,
    },
    {
      image: defaultProduct,
      id: 3,
      name: "medium",
      installemt_total: 3,
      installment_paid: 1,
      product_price: 12554,
      paid: 4556,
    },
    {
      image: defaultProduct,
      id: 4,
      name: "pro",
      installemt_total: 4,
      installment_paid: 2,
      product_price: 12554,
      paid: 4556,
    },
  ]

  const columns = [
    {
      field: 'image', headerName: 'Product Image', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: ({ row: { image } }) => (
        <Avatar src={image} variant="square" sx={{ bgcolor: "#3B3B3B", borderRadius:0.2 }} />
      )
    },
    { field: 'id', headerName: 'Invoice ID', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'name', headerName: 'Product Name', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'product_price', headerName: 'Product Price', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'paid', headerName: 'Paid Amount', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'installemt', headerName: 'Installemt', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: ({ row: { installemt_total, installment_paid } }) => (
        <Slider
          aria-label="Always visible"
          defaultValue={installment_paid}
          step={1}
          size="small"
          marks
          max={installemt_total}
          disabled={true}
          sx={{
            "	.Mui-disabled": { color: "primary.main" },
            ".MuiSlider-track": { color: "primary.main" },
            ".MuiSlider-rail": { color: "primary.main" },
            ".MuiSlider-mark": { color: "black" },
          }}
        />
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
        alert("Deleted " + row.id)
      },
      "Are you sure do you want to delete this invoice? This cannot be undone"
    ]))
    console.log(row);
  }



  return (
    <Box width="100%" >
      <BreadCrumbs />

      <Box mt={2}>
        <DataGrid
          rows={ShoppingHistroy}
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