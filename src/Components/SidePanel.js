import {
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText, Toolbar
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import WSellerDrawerData from "../LocalData/Drawer/WSellerDrawerData";
import WAdminDrawerData from "../LocalData/Drawer/WAdminDrawerData";
import { authActions } from '../Store/authSlice';

const SidePanel = () => {
  const dispatch = useDispatch()
  const [current, setCurrent] = useState("");
  const [data, setData] = useState([]);
  const location = useLocation()
  const drawerState = useSelector(state => state.leftDrawer.status)

  const authROle = useSelector(state => state.auth.role)

  useEffect(() => {
    const pathArrays = location.pathname.split("/").filter(x => x)
    if (pathArrays[0] === "w") authROle === "admin" ? setData(WAdminDrawerData) : setData(WSellerDrawerData)
    setCurrent(pathArrays[1])
  }, [location])

  const buttonOnClick = (name) => (name === "Logout") && dispatch(authActions.logout())

  const hoverStyle = () => {
    let element = null

    if (drawerState)
      element = "MuiListItemButton"
    else
      element = "MuiSvgIcon"

    return {
      [`& .${element}-root:hover`]: {
        backgroundColor: "primary.main",
        color: "white",
      },
      [`& .${element}-root`]: {
        borderRadius: element === "MuiSvgIcon" ? 0.3 : 0.2,
        p: 0.5
      },
    }
  }

  const selectedStyle = (name) => {
    if (current === name)
      if (drawerState)
        return style_selected_open
      else
        return style_selected_close
  }

  return (
    <Drawer
      variant="permanent"
      open={drawerState}
      sx={hoverStyle()}>
      <Toolbar />
      <List>
        {data.map(({ name, path, icon }, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block', ...selectedStyle(name.toLowerCase()) }}>
            <Link to={path}>
              <ListItemButton
                onClick={() => buttonOnClick(name)}
                sx={{
                  minHeight: 48,
                  justifyContent: drawerState ? 'initial' : 'center',
                  marginX: 1.5,
                  paddingX: 0
                }} >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerState ? 2 : 'auto',
                    justifyContent: 'center',
                  }} >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ opacity: drawerState ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SidePanel

// custom drawer to animate open and close
const drawerWidth = 180;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    ...(open && {
      ...theme.mixins.openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': theme.mixins.openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...theme.mixins.closedMixin(theme),
      '& .MuiDrawer-paper': theme.mixins.closedMixin(theme),
    }),
  }),
);

const style_selected_open = {
  '& .MuiListItemButton-root': {
    borderRadius: 0.2,
    backgroundColor: "primary.main",
    color: "white"
  },
  '& .MuiSvgIcon-root': {
    backgroundColor: "primary.main",
    borderRadius: 0.3,
    color: "white"
  },
}
const style_selected_close = {
  '& .MuiSvgIcon-root': {
    backgroundColor: "#FF8B03 !important",
    color: "white"
  },
}
