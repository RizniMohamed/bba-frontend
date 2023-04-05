import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Box } from '@mui/system'
import { dialogActions } from '../Store/dialogSlice'

const ProductDetails = () => {

    const dispatch = useDispatch()
    const { status, data } = useSelector(state => state.dialog.productDetails)
    const [product, setProduct] = useState([])
    console.log('data##########', data)


    const loadData = async () => {

        console.log('data======', data)

        var product_data = data.map(c => {
            var totalCost = c.price * c.quantity
            return {
                id: c.id,
                image: c.image,
                price: c.price,
                quantity: c.quantity,
                total: totalCost,

            }
        })
        setProduct(product_data)
    }
    console.log('product', product)

    useEffect(() => { loadData() }, [data])

    const columns = [
        {
            field: 'image', headerName: 'Image', flex: 1, width: 130, headerAlign: "center", align: 'center',
            renderCell: ({ row: { image } }) => <Avatar src={image} variant="rounded" sx={{ bgcolor: "#3B3B3B" }} />
        },
        { field: 'id', headerName: 'ID', flex: 1, width: 100, headerAlign: "center", align: 'center' },
        { field: 'price', headerName: 'Price', flex: 1, width: 160, headerAlign: "center", align: 'center' },
        { field: 'quantity', headerName: 'Quantity', flex: 1, width: 160, headerAlign: "center", align: 'center' },
        { field: 'total', headerName: 'Total', flex: 1, width: 160, headerAlign: "center", align: 'center' },

    ];


    return (
        <Dialog open={status} onClose={() => {
            dispatch(dialogActions.hide("productDetails"))
        }}  >
            <DialogTitle fontWeight={700} fontSize={30} textAlign="center">Products</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, p: 0, width: "500px" }}>
                <Box width="100%" >

                    <Box mt={2}>
                        <DataGrid
                            rows={product}
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
            </DialogContent>

        </Dialog >

    )
}

export default ProductDetails

const tableStyle = {
    mx: "auto",
    width: "500px",
    color: "white",
    ".MuiSvgIcon-root": {
        color: "white"
    },
    ".MuiDataGrid-cell": {
        borderColor: "black"
    },
    borderRadius: 0.3,
    mb:2
}