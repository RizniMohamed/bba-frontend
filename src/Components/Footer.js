import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const data = [
  {
    name: "About Us",
    data: []
  },
  {
    name: "Terms & Condition",
    data: []
  },
  {
    name: "Privacy Policy",
    data: []
  },
  {
    name: "Privacy Policy",
    data: []
  },
  {
    name: "Payment Policy",
    data: []
  },
]

const Footer = () => {
  return (
    <Paper elevation={3} sx={{ bgcolor: "background.mainbg", borderRadius: 0, color: "white" }}>
      <Box pt={4} px={6} display="flex" justifyContent="space-between" width={"55vw"}>
        <Box >
          <Typography fontSize={18} fontWeight={500} color="white">Useful Links</Typography>
          <Box mt={1}>
            {data.map((item, index) =>
              <Typography
                key={index}
                onClick={() => alert("View data in popup")}
                sx={{ cursor: "pointer", ":hover": { color: "primary.main" } }}
                fontSize={16}
                color="white">
                {item.name}
              </Typography>
            )}
          </Box>
        </Box>
        <Box >
          <Typography fontSize={18} fontWeight={500} color="white">Contact Us</Typography>
          <Box mt={1} display="flex" alignItems="center">
            <CallIcon fontSize='small' sx={{ mr: 1 }} />
            <Typography fontSize={16} color="white" sx={{ width: 40 }}>Call</Typography>
            <Typography fontSize={16} color="white" textAlign="center" sx={{ width: 25 }}>:</Typography>
            <Typography fontSize={16} color="white">+94 77 58 24 807</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <MailOutlineIcon fontSize='small' sx={{ mr: 1 }} />
            <Typography fontSize={16} color="white" sx={{ width: 40 }}>Email</Typography>
            <Typography fontSize={16} color="white" textAlign="center" sx={{ width: 25 }}>:</Typography>
            <Typography fontSize={16} color="white">yazhalcity@gmail.com</Typography>
          </Box>
        </Box>
        <Box >
          <Typography fontSize={18} fontWeight={500} color="white">Follow Us</Typography>
          <Box mt={1} display="flex" alignItems="center">
            <FacebookOutlinedIcon fontSize='small' sx={{ mr: 1, cursor: "pointer", ":hover": { color: "primary.main" } }} />
            <TwitterIcon fontSize='small' sx={{ mr: 1, cursor: "pointer", ":hover": { color: "primary.main" } }} />
            <InstagramIcon fontSize='small' sx={{ mr: 1, cursor: "pointer", ":hover": { color: "primary.main" } }} />
          </Box>
        </Box>
      </Box>

      <Box pb={2} pt={3} display="flex" justifyContent="center">
        <Typography fontSize={14} fontWeight={500} color="white">COPYRIGHT &copy; 2022 YAZHAL CITY ALL RIGHT RESERVED </Typography>
      </Box>

    </Paper>
  )
}

export default Footer