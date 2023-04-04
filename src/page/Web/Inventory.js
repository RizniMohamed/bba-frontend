import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import { messageActions } from '../../Store/messageSlice';
import { createProduct, deleteProduct, getProductsByShop } from '../../Services/product';
import { getShopBySeller } from '../../Services/shop';
import { useParams } from 'react-router-dom';

const Inventory = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const params = useParams()

  const [products, setProducts] = useState([])

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
      async () => {
        const { data, status } = await deleteProduct(row.id);
        if (status !== 200) {
          dispatch(messageActions.show([data, "error"]))
          return
        }
        dispatch(messageActions.show([data]))
        loadData()
        dispatch(dialogActions.hide("delete"))
      },
      "Are you sure do you want to delete this product? All purchaes assoicated with this product will also deleted"
    ]))
    console.log(row);
  }

  const handleAdd = () => dispatch(dialogActions.show(["product", loadData, "create"]))
  const handleEdit = row => dispatch(dialogActions.show(["product", loadData, row]))

  const loadData = async () => {
    const { shopID } = params
    const { data, status } = await getProductsByShop(shopID || auth.shopID);
    if (status === 200) setProducts(data)
  }

  useEffect(() => { loadData() }, [])

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
          rows={products}
          columns={columns}
          autoHeight={true}
          hideFooter={true}
          componentsProps={componentProps}
          sx={tableStyle}
        />
      </Box>

    </Box>
  )
}

export default Inventory

const componentProps = {
  columnMenu: {
    sx: {
      bgcolor: "#3B3B3B",
      ".MuiButtonBase-root": {
        color: "white"
      }
    }
  }
}

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

