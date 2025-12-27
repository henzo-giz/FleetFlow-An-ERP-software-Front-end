// src/pages/ClientTripHandlingPage/ClientTripHandlingPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Stack,
  Avatar,
  Switch, // For notifications
  FormGroup, // For notifications
  FormControlLabel, // For notifications
  Dialog, // Added for the form dialogs
  DialogTitle, // Added for the form dialogs
  DialogContent, // Added for the form dialogs
  DialogActions, // Added for the form dialogs
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Date Pickers Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Make sure dayjs is imported

// Icons for the page
import AddIcon from '@mui/icons-material/Add'; // New Client, New Trip, Create Delivery Request
import GroupsIcon from '@mui/icons-material/Groups'; // Main page icon, Total Clients
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Active Trips
import PendingActionsIcon from '@mui/icons-material/PendingActions'; // Pending Requests
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Completed Today

// Icons for Client Directory / Recent Trip Requests
import SearchIcon from '@mui/icons-material/Search'; // Search clients
import EditIcon from '@mui/icons-material/Edit'; // Edit client/trip
import VisibilityIcon from '@mui/icons-material/Visibility'; // View client/trip
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Client avatar fallback
import GpsFixedIcon from '@mui/icons-material/GpsFixed'; // Live Tracking map, Track action

// Icons for Notifications
import NotificationsIcon from '@mui/icons-material/Notifications';

// Icons for Quick Actions
import ArticleIcon from '@mui/icons-material/Article'; // Export Client Data
import BarChartIcon from '@mui/icons-material/BarChart'; // View Analytics


// Reusable component for Client/Trip Overview Metric Cards (similar to DashboardCard)
const ClientTripMetricCard = ({ title, value, icon: IconComponent, color }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        p: 2,
        height: '100%',
        width: '19.5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        color: theme.palette.text.primary,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {IconComponent && <IconComponent sx={{ fontSize: 28, color: color || theme.palette.primary.main }} />}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Card>
  );
};


const ClientTripHandlingPage = () => {
  const theme = useTheme();
  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState('All Status');

  // State for Notification Switches
  const [autoNotifyOnDispatch, setAutoNotifyOnDispatch] = useState(true);
  const [deliveryConfirmations, setDeliveryConfirmations] = useState(true);
  const [delayAlerts, setDelayAlerts] = useState(false);

  // --- New State for New Client Dialog ---
  const [openNewClientDialog, setOpenNewClientDialog] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: '',
    contactInformation: '',
    address: '',
  });

  // --- New State for New Trip Dialog ---
  const [openNewTripDialog, setOpenNewTripDialog] = useState(false);
  const [newTripData, setNewTripData] = useState({
    tripName: '',
    pickUpAddress: '',
    deliveryAddress: '',
    client: '',
    driver: '',
    vehicle: '',
    startDate: null, // Dayjs object
    eta: null, // Dayjs object
  });

  // --- Handlers for New Client Dialog ---
  const handleOpenNewClientDialog = () => {
    setOpenNewClientDialog(true);
  };

  const handleCloseNewClientDialog = () => {
    setOpenNewClientDialog(false);
    // Reset form fields when dialog closes
    setNewClientData({
      name: '',
      contactInformation: '',
      address: '',
    });
  };

  const handleNewClientFormChange = (event) => {
    const { name, value } = event.target;
    setNewClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewClientSubmit = () => {
    console.log('New Client to be added:', newClientData);
    // In a real application, you would send this data to your backend API
    // e.g., axios.post('/api/clients', newClientData)
    handleCloseNewClientDialog(); // Close dialog after submission
  };

  // --- Handlers for New Trip Dialog ---
  const handleOpenNewTripDialog = () => {
    setOpenNewTripDialog(true);
  };

  const handleCloseNewTripDialog = () => {
    setOpenNewTripDialog(false);
    // Reset form fields when dialog closes
    setNewTripData({
      tripName: '',
      pickUpAddress: '',
      deliveryAddress: '',
      client: '',
      driver: '',
      vehicle: '',
      startDate: null,
      eta: null,
    });
  };

  const handleNewTripFormChange = (event) => {
    const { name, value } = event.target;
    setNewTripData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewTripDateChange = (date, name) => {
    setNewTripData((prev) => ({
      ...prev,
      [name]: date, // date is already a Dayjs object from DatePicker
    }));
  };

  const handleAddNewTripSubmit = () => {
    console.log('New Trip to be added:', {
      ...newTripData,
      startDate: newTripData.startDate ? newTripData.startDate.format('YYYY-MM-DD') : '', // Format date for submission
      eta: newTripData.eta ? newTripData.eta.format('YYYY-MM-DD HH:mm') : '', // Format date for submission (assuming time might be relevant for ETA)
    });
    // In a real application, you would send this data to your backend API
    // e.g., axios.post('/api/trips', formattedData)
    handleCloseNewTripDialog(); // Close dialog after submission
  };


  // Mock Data for Overview Metrics
  const overviewMetrics = [
    { title: 'Total Clients', value: '1,247', icon: GroupsIcon, color: theme.palette.primary.main },
    { title: 'Active Trips', value: 89, icon: LocalShippingIcon, color: theme.palette.success.main },
    { title: 'Pending Requests', value: 23, icon: PendingActionsIcon, color: theme.palette.warning.main },
    { title: 'Completed Today', value: 156, icon: CheckCircleOutlineIcon, color: theme.palette.info.main },
  ];

  // Mock Data for Client Directory Table
  const clientDirectory = [
    { avatarUrl: '', name: 'TechCorp Solutions', contact: 'john.doe@techcorp.com', totalTrips: 142, status: 'Active', id: '#TCS001' },
    { avatarUrl: '', name: 'Global Logistics Inc', contact: 'sarah@globalogistics.com', totalTrips: 89, status: 'Active', id: '#GLI002' },
    { avatarUrl: '', name: 'Swift Delivery Co.', contact: 'info@swift.com', totalTrips: 55, status: 'Inactive', id: '#SDC003' },
    { avatarUrl: '', name: 'Cargo Express', contact: 'support@cargoexp.com', totalTrips: 210, status: 'Active', id: '#CEX004' },
  ];

  // Mock Data for Recent Trip Requests
  const recentTripRequests = [
    {
      type: 'Delivery to Adama Office',
      description: 'Vehicle for pickup: Piassa → Delivery: Adama',
      requested: '2 hours ago',
      status: 'Pending',
      clientRef: '#TR001',
    },
    {
      type: 'Equipment Transport',
      description: 'Pickup: Warehouse A → Delivery: Site B',
      requested: '4 hours ago',
      status: 'In Progress',
      clientRef: '#TR002',
    },
    {
      type: 'Urgent Document Delivery',
      description: 'Pickup: City Center → Delivery: Bole',
      requested: '1 day ago',
      status: 'Completed',
      clientRef: '#TR003',
    },
  ];

  // Mock Data for Live Tracking Active Vehicles
  const liveTrackingVehicles = [
    { id: 'FL-001', status: 'On Route', count: 12 },
    { id: 'FL-002', status: 'Delayed', count: 8 },
  ];

  const getClientStatusChipColor = (status) => {
    switch (status) {
      case 'Active': return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText };
      case 'Inactive': return { bgcolor: theme.palette.grey[500], color: theme.palette.common.white };
      default: return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText };
    }
  };

  const getTripRequestChipColor = (status) => {
    switch (status) {
      case 'Pending': return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText };
      case 'In Progress': return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText };
      case 'Completed': return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText };
      default: return { bgcolor: theme.palette.grey[500], color: theme.palette.common.white };
    }
  };

  // Mock options for New Trip form selects
  const clientOptions = ['TechCorp Solutions', 'Global Logistics Inc', 'Swift Delivery Co.', 'Cargo Express'];
  const driverOptions = ['John Smith', 'Mike Johnson', 'Sarah Wilson', 'Emily Davis'];
  const vehicleOptions = ['FL-001', 'FL-002', 'FL-003', 'FL-004'];


  return (
    <Box sx={{ p: 3,pt: 0,mt: 0, bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      {/* Page Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box>
          {/* <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Manage clients, delivery requests, and track shipments
          </Typography> */}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenNewClientDialog} // <--- New Client button handler
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            New Client
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenNewTripDialog} // <--- New Trip button handler
            sx={{
              backgroundColor: theme.palette.success.main, // Different color for New Trip
              '&:hover': { backgroundColor: theme.palette.success.dark },
            }}
          >
            New Trip
          </Button>
        </Box>
      </Box>

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {overviewMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ClientTripMetricCard {...metric} />
          </Grid>
        ))}
      </Grid>

      {/* Main Content: Client Management, Recent Trip Requests (Left) and Live Tracking, Notifications, Quick Actions (Right) */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={7}> {/* Takes more space for client directory/trips */}
          <Stack spacing={3}>
            {/* Client Management */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Client Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search clients..."
                    size="small"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                    }}
                    sx={{
                      width: '45vw',
                      flexGrow: 1,
                      minWidth: '200px',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.background.default,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                      '& .MuiInputBase-input': { color: theme.palette.text.primary },
                      '& .MuiInputBase-input::placeholder': { color: theme.palette.text.secondary, opacity: 1 },
                    }}
                  />
                  <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                    <InputLabel sx={{ color: theme.palette.text.secondary }}>All Status</InputLabel>
                    <Select
                      value={clientStatusFilter}
                      onChange={(e) => setClientStatusFilter(e.target.value)}
                      label="All Status"
                      sx={{
                        color: theme.palette.text.primary,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                        '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                      }}
                      MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                    >
                      <MenuItem value="All Status">All Status</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Client Directory
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['Client', 'Contact', 'Total Trips', 'Status', 'Actions'].map((head) => (
                          <TableCell
                            key={head}
                            sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 'bold',
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            }}
                          >
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clientDirectory.map((client, index) => {
                        const statusColors = getClientStatusChipColor(client.status);
                        return (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ color: theme.palette.text.primary, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar src={client.avatarUrl || `https://placehold.co/32x32/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${client.name.charAt(0)}`} sx={{ width: 32, height: 32 }} />
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>{client.name}</Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{client.id}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: theme.palette.text.primary }}>{client.contact}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.primary }}>{client.totalTrips}</TableCell>
                            <TableCell>
                              <Chip
                                label={client.status}
                                size="small"
                                sx={{
                                  bgcolor: statusColors.bgcolor,
                                  color: statusColors.color,
                                  fontWeight: 'bold',
                                  borderRadius: '8px',
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><EditIcon fontSize="small" /></IconButton>
                                <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><VisibilityIcon fontSize="small" /></IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Recent Trip Requests */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Recent Trip Requests
                </Typography>
                <Stack spacing={2}>
                  {recentTripRequests.map((request, index) => {
                    const statusColors = getTripRequestChipColor(request.status);
                    return (
                      <Card key={index} sx={{ bgcolor: theme.palette.background.default, borderRadius: theme.shape.borderRadius, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                            {request.type}
                          </Typography>
                          <Chip
                            label={request.status}
                            size="small"
                            sx={{
                              bgcolor: statusColors.bgcolor,
                              color: statusColors.color,
                              fontWeight: 'bold',
                              borderRadius: '8px',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                          {request.description}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.disabled }}>
                          Requested: {request.requested}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                          {request.status === 'Pending' && (
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': { bgcolor: theme.palette.primary.dark },
                                color: theme.palette.common.white,
                                fontWeight: 'bold',
                                borderRadius: '8px',
                              }}
                            >
                              Assign
                            </Button>
                          )}
                           {request.status !== 'Pending' && (
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                borderColor: theme.palette.text.secondary,
                                color: theme.palette.text.secondary,
                                '&:hover': { borderColor: theme.palette.primary.main, bgcolor: theme.palette.action.hover },
                                fontWeight: 'bold',
                                borderRadius: '8px',
                              }}
                            >
                              View
                            </Button>
                          )}
                        </Box>
                      </Card>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5}> {/* Smaller space for tracking/notifications/quick actions */}
          <Stack spacing={3}>
            {/* Live Tracking */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Live Tracking
                </Typography>
                <Box
                  sx={{
                    width: '20vw',
                    bgcolor: theme.palette.grey[900], // Dark grey background for map placeholder
                    borderRadius: theme.shape.borderRadius,
                    height: 180, // Slightly adjusted height for design
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <GpsFixedIcon sx={{ fontSize: 60, color: theme.palette.grey[700], mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ color: theme.palette.grey[500], fontWeight: 'bold' }}>
                    Map Integration
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.grey[600] }}>
                    Real-time vehicle tracking
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  {liveTrackingVehicles.map((vehicle, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                        {vehicle.status === 'On Route' ? 'Active Vehicles' : 'Delayed'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        {vehicle.count}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Notifications
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoNotifyOnDispatch}
                        onChange={(e) => setAutoNotifyOnDispatch(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-thumb': { bgcolor: autoNotifyOnDispatch ? theme.palette.primary.main : theme.palette.grey[600] },
                          '& .MuiSwitch-track': { bgcolor: autoNotifyOnDispatch ? theme.palette.primary.light : theme.palette.grey[500] },
                        }}
                      />
                    }
                    label={<Typography sx={{ color: theme.palette.text.primary }}>Auto-notify on dispatch</Typography>}
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={deliveryConfirmations}
                        onChange={(e) => setDeliveryConfirmations(e.target.checked)}
                          sx={{
                          '& .MuiSwitch-thumb': { bgcolor: deliveryConfirmations ? theme.palette.primary.main : theme.palette.grey[600] },
                          '& .MuiSwitch-track': { bgcolor: deliveryConfirmations ? theme.palette.primary.light : theme.palette.grey[500] },
                        }}
                      />
                    }
                    label={<Typography sx={{ color: theme.palette.text.primary }}>Delivery confirmations</Typography>}
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={delayAlerts}
                        onChange={(e) => setDelayAlerts(e.target.checked)}
                          sx={{
                          '& .MuiSwitch-thumb': { bgcolor: delayAlerts ? theme.palette.primary.main : theme.palette.grey[600] },
                          '& .MuiSwitch-track': { bgcolor: delayAlerts ? theme.palette.primary.light : theme.palette.grey[500] },
                        }}
                      />
                    }
                    label={<Typography sx={{ color: theme.palette.text.primary }}>Delay alerts</Typography>}
                  />
                </FormGroup>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': { bgcolor: theme.palette.primary.dark },
                      color: theme.palette.common.white,
                      fontWeight: 'bold',
                      borderRadius: theme.shape.borderRadius,
                      py: 1.5,
                    }}
                  >
                    Create Delivery Request
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ArticleIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.success.main, // Different color
                      '&:hover': { bgcolor: theme.palette.success.dark },
                      color: theme.palette.common.white,
                      fontWeight: 'bold',
                      borderRadius: theme.shape.borderRadius,
                      py: 1.5,
                    }}
                  >
                    Export Client Data
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<BarChartIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.info.main, // Different color
                      '&:hover': { bgcolor: theme.palette.info.dark },
                      color: theme.palette.common.white,
                      fontWeight: 'bold',
                      borderRadius: theme.shape.borderRadius,
                      py: 1.5,
                    }}
                  >
                    View Analytics
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* New Client Dialog Form */}
      <Dialog open={openNewClientDialog} onClose={handleCloseNewClientDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Add New Client
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Client Name"
              name="name"
              value={newClientData.name}
              onChange={handleNewClientFormChange}
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
              }}
            />
            <TextField
              fullWidth
              label="Contact Information (Email or Phone)"
              name="contactInformation"
              value={newClientData.contactInformation}
              onChange={handleNewClientFormChange}
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
              }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={newClientData.address}
              onChange={handleNewClientFormChange}
              margin="dense"
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
          <Button onClick={handleCloseNewClientDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddNewClientSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Client
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Trip Dialog Form */}
      <Dialog open={openNewTripDialog} onClose={handleCloseNewTripDialog} fullWidth maxWidth="md"
        sx> {/* Increased maxWidth for more fields */}
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Add New Trip
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Trip Name"
                        name="tripName"
                        value={newTripData.tripName}
                        onChange={handleNewTripFormChange}
                        margin="dense"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.divider },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                          },
                          '& .MuiInputBase-input': { color: theme.palette.text.primary },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Pick-up Address"
                        name="pickUpAddress"
                        value={newTripData.pickUpAddress}
                        onChange={handleNewTripFormChange}
                        margin="dense"
                        multiline
                        rows={2}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.divider },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                          },
                          '& .MuiInputBase-input': { color: theme.palette.text.primary },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Delivery Address"
                        name="deliveryAddress"
                        value={newTripData.deliveryAddress}
                        onChange={handleNewTripFormChange}
                        margin="dense"
                        multiline
                        rows={2}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.divider },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                          },
                          '& .MuiInputBase-input': { color: theme.palette.text.primary },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Client"
                        name="client"
                        value={newTripData.client}
                        onChange={handleNewTripFormChange}
                        margin="dense"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.divider },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                          },
                          '& .MuiInputBase-input': { color: theme.palette.text.primary },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Driver"
                        name="driver"
                        value={newTripData.driver}
                        onChange={handleNewTripFormChange}
                        margin="dense"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.divider },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                          },
                          '& .MuiInputBase-input': { color: theme.palette.text.primary },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Vehicle"
                        name="vehicle"
                        value={newTripData.vehicle}
                        onChange={handleNewTripFormChange}
                        margin="dense"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.divider },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                          },
                          '& .MuiInputBase-input': { color: theme.palette.text.primary },
                          '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                        }}
                      />
                      <DatePicker
                        label="Start Date"
                        value={newTripData.startDate}
                        onChange={(date) => handleNewTripDateChange(date, 'startDate')}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            margin: 'dense',
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: theme.palette.background.paper,
                                '& fieldset': { borderColor: theme.palette.divider },
                                '&:hover fieldset': { borderColor: theme.palette.primary.main },
                                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                              },
                              '& .MuiInputBase-input': { color: theme.palette.text.primary },
                              '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                            },
                          },
                        }}
                      />
                      <DatePicker
                        label="ETA"
                        value={newTripData.eta}
                        onChange={(date) => handleNewTripDateChange(date, 'eta')}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            margin: 'dense',
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: theme.palette.background.paper,
                                '& fieldset': { borderColor: theme.palette.divider },
                                '&:hover fieldset': { borderColor: theme.palette.primary.main },
                                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                              },
                              '& .MuiInputBase-input': { color: theme.palette.text.primary },
                              '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                            },
                          },
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
                </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
          <Button onClick={handleCloseNewTripDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddNewTripSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.success.main, // Matching button color
              '&:hover': { backgroundColor: theme.palette.success.dark },
            }}
          >
            Add Trip
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientTripHandlingPage;