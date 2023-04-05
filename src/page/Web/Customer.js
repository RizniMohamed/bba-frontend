import { Delete, ShoppingBag } from '@mui/icons-material';
import { Avatar, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../Components/BreadCrumbs';
import { dialogActions } from '../../Store/dialogSlice';
import { messageActions } from '../../Store/messageSlice';
import { getInvoiceByShop } from '../../Services/invoice';

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const [data, setData] = useState([])

  const loadData = async () => {
    let { data: shopData,status } = await getInvoiceByShop(auth.shopID)
    if (status !== 200) {
      dispatch(messageActions.show([data, "error"]))
      return
    }
    console.log('shopData', shopData)

    const uniqueIds = {}
    const processedData = shopData.map((c) => {
      // Check if ID already exists in uniqueIds object
      if (uniqueIds[c.person.id]) {
        return null // Skip this record
      } else {
        uniqueIds[c.person.id] = true // Mark ID as seen
      }

      const dob = new Date(c.person.dob)
      const ageInMs = Date.now() - dob.getTime()
      const ageInYears = Math.floor(ageInMs / 31556952000)
      return {
        id: c.person.id,
        image: c.person.image,
        name: c.person.name,
        age: ageInYears,
        email: c.person.email,
        contact: c.person.contact,
      }
    })

    const filteredData = processedData.filter((record) => record !== null)

    setData(filteredData)
  }
  console.log('data', data)

  useEffect(() => { loadData() }, [])

  const columns = [
    {
      field: 'image', headerName: 'Image', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: ({ row: { image } }) =>  <Avatar src={image} variant="rounded" sx={{ bgcolor: "#3B3B3B" }} />
    },
    { field: 'id', headerName: 'ID', flex: 1, width: 100, headerAlign: "center", align: 'center' },
    { field: 'name', headerName: 'Name', flex: 1, width: 160, headerAlign: "center", align: 'center' },
    { field: 'email', headerName: 'Email', flex: 1, width: 160, headerAlign: "center", align: 'center' },
    { field: 'age', headerName: 'Age', flex: 1, width: 100, headerAlign: "center", align: 'center' },
    { field: 'contact', headerName: 'Contact', flex: 1, width: 130, headerAlign: "center", align: 'center' },
    {
      field: 'shopHistroy', headerName: 'Shopping Histroy', flex: 1, width: 130, headerAlign: "center", align: 'center',
      renderCell: (row) => (
        <IconButton size='small' sx={{ color: "#FF8B03", bgcolor: "#3B3B3B !important" }} onClick={() => navigate(`${row.id}/shopping history`)} >
          <ShoppingBag fontSize='small' sx={{ color: "#FF8B03 !important" }} />
        </IconButton>
      )
    }
  ];


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