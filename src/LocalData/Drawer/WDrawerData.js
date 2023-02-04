import {
  Dashboard, Badge,ExitToApp,Paid,Inventory
} from '@mui/icons-material';


const data = [
  {
    name: "Dashboard",
    path: "/w/dashboard",
    icon: <Dashboard />
  },
  {
    name: "Customer",
    path: "/w/customer",
    icon: <Badge />
  },
  {
    name: "Loan",
    path: "/w/loan",
    icon: <Paid />
  },
  {
    name: "Inventory",
    path: "/w/inventory",
    icon: <Inventory />
  },
  {
    name: "Logout",
    path: "/",
    icon: <ExitToApp />
  },
]

export default data