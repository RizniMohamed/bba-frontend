import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <>
      <Box textAlign="center" color="red" display="flex" alignItems="center" justifyContent="center" height="100vh" flexDirection="column">
        <Typography fontWeight={900} fontSize={42}>404 :(</Typography>
        <Typography fontWeight={900} fontSize={30}>Page Not Found</Typography>
      </Box>
    </>
  )
}

export default NotFound