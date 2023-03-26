import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../Components/BreadCrumbs'
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import { messageActions } from '../../Store/messageSlice';
import { createLoan, deleteLoan, getLoanByShop, upadateLoan } from '../../Services/loan';
import { getShopBySeller } from '../../Services/shop';

const Loan = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [loans, SetLoans] = useState([])

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'name', headerName: 'Loan name', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'startPrice', headerName: 'Start Price LKR', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'endPrice', headerName: 'End Price LKR', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'interest', headerName: 'interest (%)', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    { field: 'steps', headerName: 'installment Steps', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'edit', headerName: 'Edit', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        params.row.name.toLowerCase() !== "free" && <IconButton onClick={() => handleEdit(params.row)} size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }}>
          <Edit fontSize='small' sx={{ color: "#FF8B03 !important" }} />
        </IconButton>
      )
    },
    {
      field: 'delete', headerName: 'Delete', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        params.row.name.toLowerCase() !== "free" && <IconButton disabled={params.row.name === "free"} onClick={() => handleDelete(params.row)} size='small' sx={{ color: "red", bgcolor: "#3B3B3B !important" }}>
          <Delete fontSize='small' sx={{ color: "red !important" }} />
        </IconButton>
      )
    },
  ];

  const handleDelete = row => {
    dispatch(dialogActions.show([
      "delete",
      async () => {
        const { data, status } = await deleteLoan(row.id);
        if (status !== 200) {
          dispatch(messageActions.show([data, "error"]))
          return
        }
        dispatch(messageActions.show([data]))
        loadData()
        dispatch(dialogActions.hide("delete"))
      },
      "Are you sure do you want to delete this loan scheme? All purchaes assoicated with this loan will also deleted"
    ]))
  }

  const handleEdit = row => {
    dispatch(dialogActions.show([
      "loan",
      async (inVals) => {
        const { data, status } = await upadateLoan(row.id, inVals);
        if (status !== 200) {
          dispatch(messageActions.show([data, "error"]))
          return
        }
        dispatch(messageActions.show([data]))
        loadData()
        dispatch(dialogActions.hide("loan"))
      },
      row
    ]))
  }


  const handleAdd = () => {
    dispatch(dialogActions.show([
      "loan",
      async (inVals) => {
        const { data: shopData, status: shopStatus } = await getShopBySeller(auth.userID)
        if (shopStatus !== 200) {
          dispatch(messageActions.show([shopData, "error"]))
          return
        }
        inVals['shopID'] = shopData.id
        const { data, status } = await createLoan(inVals);
        if (status !== 200) {
          dispatch(messageActions.show([data, "error"]))
          return
        }
        dispatch(messageActions.show([data]))
        loadData()
        dispatch(dialogActions.hide("loan"))
      },
      "create"
    ]))
  }

  const loadData = async () => {
    const { data: shopData, status: shopStatus } = await getShopBySeller(auth.userID)
    if (shopStatus !== 200) {
      dispatch(messageActions.show([shopData, "error"]))
      return
    }
    const { data, status } = await getLoanByShop(shopData.id);
    if (status === 200) SetLoans(data)
  }

  useEffect(() => { loadData() }, [])


  return (
    <Box width="100%" >
      <BreadCrumbs />

      <Box display="flex" justifyContent="end" mr={5}>
        <Button size='small' variant='contained' onClick={handleAdd}   >
          <Typography fontSize={15} fontWeight={600} color="white"> Add  </Typography>
          <Add fontSize='small' sx={{ color: "white" }} />
        </Button>
      </Box>

      <Box mt={2}>
        <DataGrid
          rows={loans}
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