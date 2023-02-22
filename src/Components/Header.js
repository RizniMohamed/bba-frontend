import { Menu, AccountCircle } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { drawerActions } from '../Store/drawerSlice';
import logo from '../LocalData/image/logo.png';
const Header = () => {

  const drawerState = useSelector(state => state.leftDrawer.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [profileStyle, setProfileStyle] = useState({ color: "white" })

  const handleDrawerState = () => drawerState ? dispatch(drawerActions.hide()) : dispatch(drawerActions.show())
  const handleProfile = () => navigate('profile')

  useEffect(() => {
    const pathArrays = location.pathname.split("/").filter(x => x)
    const selectedStyle = { color: "primary.main" }
    const unSelectedStyle = { color: "white" }
    setProfileStyle(pathArrays[1]?.toLowerCase() === "profile" ? selectedStyle : unSelectedStyle)
  }, [location])



  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          {<IconButton
            onClick={handleDrawerState}
            edge="start"
            sx={{ color: drawerState ? "primary.main" : "white" }}
          >
            <Menu />
          </IconButton>}

          <Box mx={2} display="flex" alignItems="center" flexGrow={1}>
            {/* <Logo /> */}
            <Avatar alt="Remy Sharp" src={logo} variant="rounded" sx={{ width: 40, height: 40, borderRadius: "100%", p: 1 }} />
            <Typography fontSize={20} color="white" fontFamily="serif" fontWeight={600}>Bumble Bee</Typography>
          </Box>

          {<IconButton
            onClick={handleProfile}
            edge="start"
            sx={profileStyle}
          >
            <AccountCircle />
          </IconButton>}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header