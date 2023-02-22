import { Outlet, Route, Routes } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Header from "../Components/Header";
import SidePanel from "../Components/SidePanel";
import Login from '../page/Login';
import NotFound from "../page/NotFound";
import WDashboard from '../page/Web/Dashboard';
import WCustomer from '../page/Web/Customer';
import WInventory from '../page/Web/Inventory';
import WProfile from '../page/Web/Profile';
import WLoan from '../page/Web/Loan';
import Shop from '../page/Web/Shop'

import { drawerActions } from "../Store/drawerSlice";

function Protected({ isSignedIn, children }) {

  const dispatch = useDispatch()

  if (!isSignedIn) return <Navigate to="/" replace />

  return children ? children : (
    <Box p={1} >
      <Header />
      <Toolbar />
      <Box display="flex">
        <SidePanel />
        <Box display="inherit" width="100%" onClick={() => dispatch(drawerActions.hide())}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}


function Views() {
  const authSate = useSelector(state => state.auth.status)


  return (
    <Routes>

      <Route index element={<Shop />} />
      <Route path="login" element={<Login />} />

      <Route path="w" element={< Protected isSignedIn={true} />}>
        <Route path="dashboard" element={<WDashboard />} />
        <Route path="customer" element={<WCustomer />} />
        <Route path="profile" element={<WProfile />} />
        <Route path="loan" element={<WLoan />} />
        <Route path="inventory" element={<WInventory />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Views