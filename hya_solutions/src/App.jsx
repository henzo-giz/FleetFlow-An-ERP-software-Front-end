// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';

// Icons for navigation
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings'; // Added Settings Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Added Account Circle Icon

import { useColorMode } from './ThemeContext';

// Import your Dashboard and FleetManagement components
import DashboardPage from './pages/Dashboard';
import FleetManagementPage from './pages/FleetManagement';
import FuelManagementPage from './pages/FuelManagement';
import DriverManagementPage from './pages/DriverManagement';
import MaintenanceManagementPage from './pages/MaintenanceManagement';
import InventoryManagementPage from './pages/InventoryManagement';
import AccountingFinancePage from './pages/Accounting';
import ClientTripHandlingPage from './pages/Clients&Trips';
import ReportsPage from './pages/Reports';
import LoginPage from './pages/Login';

const drawerWidth = 240;

// This component wraps routes that require authentication and specific roles
const ProtectedRoute = ({ children, isLoggedIn, userRole, allowedRoles }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // If allowedRoles is provided, check if the user's role is in the allowedRoles array
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Optionally, navigate to an "Access Denied" page or dashboard
    return <Navigate to="/" replace />; // Redirect to dashboard or a specific access denied page
  }
  return children;
};

function App() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const [open, setOpen] = useState(true);
  const location = useLocation();

  // State to track authentication status and user role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // New state for user role

  // State for the profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Modified login success handler to set the user role
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null); // Clear user role on logout
    handleClose();
    // In a real app, clear tokens from localStorage/sessionStorage here
  };

  // Define navigation items with required roles
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/', roles: ['Admin', 'Fleet Manager', 'Driver', 'Mechanic', 'Accountant'] },
    { text: 'Fleet Management', icon: <LocalShippingIcon />, path: '/fleet-management', roles: ['Admin', 'Fleet Manager'] },
    { text: 'Driver Management', icon: <GroupIcon />, path: '/driver-management', roles: ['Admin', 'Fleet Manager'] },
  ];

  const maintenanceItems = [
    { text: 'Fuel Management', icon: <LocalGasStationIcon />, path: '/fuel-management', roles: ['Admin', 'Fleet Manager', 'Mechanic'] },
    { text: 'Maintenance', icon: <BuildIcon />, path: '/maintenance', roles: ['Admin', 'Mechanic'] },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory', roles: ['Admin', 'Mechanic'] },
  ];

  const otherItems = [
    { text: 'Accounting', icon: <AccountBalanceWalletIcon />, path: '/accounting', roles: ['Admin', 'Accountant'] },
    { text: 'Client & Trips', icon: <GroupsIcon />, path: '/clients-trips', roles: ['Admin', 'Fleet Manager'] },
    { text: 'Reports', icon: <DescriptionIcon />, path: '/reports', roles: ['Admin', 'Fleet Manager', 'Accountant'] },
  ];

  const allNavItems = [...navItems, ...maintenanceItems, ...otherItems];

  // Function to filter sidebar items based on user role
  const getFilteredNavItems = (items) => {
    if (!userRole) return []; // No items if not logged in or no role
    return items.filter(item => item.roles.includes(userRole));
  };

  const getPageTitle = () => {
    const currentItem = allNavItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'Fleet ERP';
  };

  if (!isLoggedIn) {
    return (
      // Pass the handleLoginSuccess to the LoginPage
      <LoginPage onLoginSuccess={handleLoginSuccess} />
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* Sidebar (Drawer Component) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: theme.palette.background.paper,
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          },
        }}
        open={open}
      >
        <Toolbar sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, minHeight: '64px', bgcolor: theme.palette.background.paper,
        }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.text.primary }}>
            Fleet ERP
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {getFilteredNavItems(navItems).map((item) => ( // Filtered
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&:hover': { bgcolor: theme.palette.action.hover },
                  '&.Mui-selected': {
                    bgcolor: theme.palette.action.selected,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    '&:hover': { bgcolor: theme.palette.action.selected }
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: theme.palette.text.primary }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {getFilteredNavItems(maintenanceItems).map((item) => ( // Filtered
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&:hover': { bgcolor: theme.palette.action.hover },
                  '&.Mui-selected': {
                    bgcolor: theme.palette.action.selected,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    '&:hover': { bgcolor: theme.palette.action.selected }
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: theme.palette.text.primary }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {getFilteredNavItems(otherItems).map((item) => ( // Filtered
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&:hover': { bgcolor: theme.palette.action.hover },
                  '&.Mui-selected': {
                    bgcolor: theme.palette.action.selected,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    '&:hover': { bgcolor: theme.palette.action.selected }
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: theme.palette.text.primary }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px',
        }}
      >
        {/* AppBar (Top Bar) */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {getPageTitle()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {/* Profile Icon with Dropdown Menu */}
              <IconButton
                sx={{ ml: 1 }}
                color="inherit"
                onClick={handleMenu}
              >
                <img src="https://placehold.co/32x32/cccccc/000000?text=JP" alt="User Avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[3],
                    borderRadius: theme.shape.borderRadius,
                  },
                }}
              >
                {/* Display user role in the menu */}
                <MenuItem disabled>
                  <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary={`Role: ${userRole || 'Guest'}`} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* --- Render the Page Components based on Route --- */}
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

            {/* Protected routes with role-based access */}
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager', 'Driver', 'Mechanic', 'Accountant']}><DashboardPage /></ProtectedRoute>} />
            <Route path="/fleet-management" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager']}><FleetManagementPage /></ProtectedRoute>} />
            <Route path="/fuel-management" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager', 'Mechanic']}><FuelManagementPage /></ProtectedRoute>} />
            <Route path="/driver-management" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager']}><DriverManagementPage /></ProtectedRoute>} />
            <Route path="/maintenance" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Mechanic']}><MaintenanceManagementPage /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Mechanic']}><InventoryManagementPage /></ProtectedRoute>} />
            <Route path='/Accounting' element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Accountant']}><AccountingFinancePage /></ProtectedRoute>} />
            <Route path='/clients-trips' element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager']}><ClientTripHandlingPage /></ProtectedRoute>} />
            <Route path='/reports' element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager', 'Accountant']}><ReportsPage /></ProtectedRoute>} />

            {/* Fallback for undefined routes, also protected */}
            <Route path="*" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin', 'Fleet Manager', 'Driver', 'Mechanic', 'Accountant']}><Typography variant="h4" sx={{ mt: 4, color: theme.palette.text.secondary }}>Page Not Found</Typography></ProtectedRoute>} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;