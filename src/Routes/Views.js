import { Outlet, Route, Routes } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Header from "../Components/Header";
import SidePanel from "../Components/SidePanel";

// Mobile
import MLogin from '../page/Mobile/Login';
import MShop from '../page/Mobile/Shop'

// Web
import WDashboard from '../page/Web/Dashboard';
import WCustomer from '../page/Web/Customer';
import WInventory from '../page/Web/Inventory';
import WProfile from '../page/Web/Profile';
import WLoan from '../page/Web/Loan';
import WShop from '../page/Web/Shop'
import WLogin from '../page/Web/Login';

import Index from '../page/Index'
import NotFound from "../page/NotFound";

import { drawerActions } from "../Store/drawerSlice";


const Protected = ({ isSignedIn }) => {
  const dispatch = useDispatch()
  if (!isSignedIn) return <Navigate to="/" replace /> 
  return (
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

      <Route index element={<Index />} />

      <Route path="w">
        <Route index element={<WShop />} />
        <Route path="login" element={<WLogin />} />
        <Route element={<Protected isSignedIn={true} />}>
          <Route path="dashboard" element={<WDashboard />} />
          <Route path="customer" element={<WCustomer />} />
          <Route path="profile" element={<WProfile />} />
          <Route path="loan" element={<WLoan />} />
          <Route path="inventory" element={<WInventory />} />
        </Route>
      </Route>

      <Route path="m">
        <Route index element={<MShop />} />
        <Route path="login" element={<MLogin />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Views