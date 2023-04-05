import { Delete, FeedOutlined } from '@mui/icons-material';
import { Box, IconButton, Slider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../Components/BreadCrumbs';
import { getInvoiceByUser } from '../../Services/invoice';
import { dialogActions } from '../../Store/dialogSlice';
import { messageActions } from '../../Store/messageSlice';

const ShoppingHistory = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const auth = useSelector(state => state.auth)
  const params = useParams()

  const loadData = async () => {
    let { data: shopData, status } = await getInvoiceByUser(auth.shopID, params.userID)
    if (status !== 200) {
      dispatch(messageActions.show([data, "error"]))
      return
    }
    console.log('invoices', shopData)

    const processedData = shopData.map( i => {

      let total = i.products.map(obj => obj.quantity * obj.price).reduce((acc, val) => acc + val);
      total = total + ((i.loan.interest/100) * total)

      return {
        id: i.id,
        products: i.products,
        totalPrice: total,
        paid: i.paidAmount,
        installemt_total: i.loan.steps,
        installment_paid: i.paidInstallment,

      }
    })

    setData(processedData)
  }
  console.log('data', data)

  useEffect(() => { loadData() }, [])

  const columns = [
    { field: 'id', headerName: 'Invoice ID', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'products', headerName: 'Product Details', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (params) => (
        <IconButton onClick={() => handleProducts(params.row)} size='small' sx={{ ".MuiSvgIcon-root": { color: "FF8B03 !important" }, bgcolor: "#3B3B3B !important" }}>
          <FeedOutlined fontSize='small' sx={{ ".MuiSvgIcon-root": { color: "FF8B03 !important" } }} />
        </IconButton>
      )
    },
    { field: 'totalPrice', headerName: 'Total Price', flex: 1, width: 130, headerAlign: "center", align: 'center' },
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
    
  ];


  const handleProducts = ({ products }) => {
    dispatch(dialogActions.show(["productDetails", , products]))
    console.log(products);
  }

  return (
    <Box width="100%" >
      <BreadCrumbs />

      <Box mt={2}>
        <DataGrid
          rows={data}
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