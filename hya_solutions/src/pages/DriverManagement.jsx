// src/pages/DriverManagementPage/DriverManagementPage.jsx
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
  Avatar,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Divider, // Added from second code
  Dialog, // Added from second code
  DialogTitle, // Added from second code
  DialogContent, // Added from second code
  DialogActions, // Added from second code
  // List, // Not needed as All Drivers list is not in first code
  // ListItem, // Not needed as All Drivers list is not in first code
  // ListItemText, // Not needed as All Drivers list is not in first code
  // ListItemIcon, // Not needed as All Drivers list is not in first code
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons for the page
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person'; // Added from second code
import ArticleIcon from '@mui/icons-material/Article'; // Added from second code
import EventIcon from '@mui/icons-material/Event'; // Added from second code

// Icons for Driver Overview Cards
import GroupIcon from '@mui/icons-material/Group'; // Total Drivers
import GroupAddIcon from '@mui/icons-material/GroupAdd'; // Active Drivers (or similar for engagement)
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // On Trip
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'; // Available

// Icons for Driver Profiles
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi'; // Example icon for driver type
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Generic avatar fallback

// Icons for Driving Behavior Analytics
import GppGoodIcon from '@mui/icons-material/GppGood'; // Safety Metrics placeholder icon

// Icons for Recent Trip History Actions
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; // View
import EditIcon from '@mui/icons-material/Edit'; // Edit
import GpsFixedIcon from '@mui/icons-material/GpsFixed'; // Track
import CallIcon from '@mui/icons-material/Call'; // Contact

// Icons for Attendance Records
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Overall Attendance
import EventBusyIcon from '@mui/icons-material/EventBusy'; // Absent This Month
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Late Arrivals

// Import your custom components
import TopDriverPerformance from '../components/TopDriverPerformance'; // The component from your dashboard

// Date Picker Imports (Added from second code)
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Ensure dayjs is imported if you use it directly


// Reusable component for Driver Overview Cards (similar to FuelOverviewStatCard but simpler for now)
const DriverOverviewStatCard = ({ title, value, icon: IconComponent, color }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {IconComponent && <IconComponent sx={{ fontSize: 28, color: color || theme.palette.primary.main }} />}
      </Box>
      <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Card>
  );
};

// Reusable component for individual Driver Profiles
const DriverProfileCard = ({ name, status, license, expDate, safetyScore, avatarUrl }) => {
  const theme = useTheme();

  // Determine status color (Active, On Trip, Available)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return theme.palette.success.main;
      case 'On Trip': return theme.palette.info.main;
      case 'Available': return theme.palette.primary.main;
      case 'Inactive': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        p: 2,
        height: '100%',
        width: '14vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        textAlign: 'center', // Center text
      }}
    >
      <Avatar
        src={avatarUrl || `https://placehold.co/128x128/${Math.floor(Math.random() * 16777215).toString(16)}/ffffff?text=${name.charAt(0)}`} // Random color placeholder
        sx={{ width: 80, height: 80, mb: 1.5, border: `2px solid ${getStatusColor(status)}` }}
      >
        {!avatarUrl && <AccountCircleIcon sx={{ fontSize: 60 }} />}
      </Avatar>
      <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: getStatusColor(status), fontWeight: 'bold', mb: 1 }}>
        {status}
      </Typography>
      <Stack spacing={0.5} sx={{ width: '100%', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          License: {license}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Exp: {expDate}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Safety Score: <span style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>{safetyScore}%</span>
        </Typography>
      </Stack>
    </Card>
  );
};


const DriverManagementPage = () => {
  const theme = useTheme();
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [licenseFilter, setLicenseFilter] = useState('All Licenses');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false); // For "More Filters" dropdown/modal

  // --- State for Add New Driver Form Dialog (Added from second code) ---
  const [openAddDriverDialog, setOpenAddDriverDialog] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    age: '',
    sex: '',
    licenseNumber: '',
    licenseType: '',
    licenseExpiryDate: null, // Store as Dayjs object initially
    address: '',
  });

  // Mock Data for Driver Overview Cards
  const driverOverviewStats = [
    { title: 'Total Drivers', value: 127, icon: GroupIcon, color: theme.palette.primary.main },
    { title: 'Active Drivers', value: 98, icon: GroupAddIcon, color: theme.palette.success.main },
    { title: 'On Trip', value: 45, icon: LocalShippingIcon, color: theme.palette.info.main },
    { title: 'Available', value: 53, icon: PersonPinCircleIcon, color: theme.palette.warning.main },
  ];

  // Mock Data for Driver Profiles
  const driverProfilesData = [
    { name: 'Mulunesh Tegegne', status: 'Active', license: 'Public-1', expDate: '12/2025', safetyScore: 95, avatarUrl: 'https://placehold.co/128x128/FF5733/ffffff?text=MT' },
    { name: 'Selam Belay', status: 'On Trip', license: 'Public-1', expDate: '08/2026', safetyScore: 98, avatarUrl: 'https://placehold.co/128x128/33FF57/ffffff?text=SB' },
    { name: 'Teshome Dagnachew', status: 'Available', license: 'Public-2', expDate: '03/2025', safetyScore: 92, avatarUrl: 'https://placehold.co/128x128/3357FF/ffffff?text=TD' },
    { name: 'Meserct Grum', status: 'Active', license: 'Public-2', expDate: '11/2025', safetyScore: 96, avatarUrl: 'https://placehold.co/128x128/FF33DA/ffffff?text=MG' },
    { name: 'Yonas Gebre', status: 'Inactive', license: 'Public-1', expDate: '01/2024', safetyScore: 88, avatarUrl: 'https://placehold.co/128x128/DAFF33/ffffff?text=YG' },
  ];

  // Mock Data for Performance Overview (part of Driving Behavior Analytics)
  const performanceOverviewData = [
    { metric: 'Speeding Incidents', value: 23 },
    { metric: 'Harsh Braking', value: 45 },
    { metric: 'Idle Time (hrs)', value: 127 },
    { metric: 'Fuel Efficiency', value: '10.2 KMPG' },
  ];

  // Mock Data for Recent Trip History
  const recentTripHistory = [
    { driver: 'John Martinez', route: 'BDR → Desse', distance: '415 km', duration: '4h 30m', status: 'Completed', avatarUrl: 'https://placehold.co/32x32/8A2BE2/ffffff?text=JM' },
    { driver: 'Sarah Johnson', route: 'AA → Hawassa', distance: '382 km', duration: '6h 15m', status: 'In Progress', avatarUrl: 'https://placehold.co/32x32/FFD700/000000?text=SJ' },
    { driver: 'Mark Davis', route: 'Addis → Jimma', distance: '350 km', duration: '5h 0m', status: 'Completed', avatarUrl: 'https://placehold.co/32x32/00CED1/ffffff?text=MD' },
  ];

  // Mock Data for Attendance Records
  const attendanceRecords = {
    overallAttendance: 98.5,
    absentThisMonth: 2,
    lateArrivals: 5,
  };

  // --- Add Driver Form Handlers (Added from second code) ---
  const handleOpenAddDriverDialog = () => {
    setOpenAddDriverDialog(true);
  };

  const handleCloseAddDriverDialog = () => {
    setOpenAddDriverDialog(false);
    // Optionally reset form fields when closing
    setNewDriver({
      name: '',
      age: '',
      sex: '',
      licenseNumber: '',
      licenseType: '',
      licenseExpiryDate: null,
      address: '',
    });
  };

  const handleChangeNewDriver = (e) => {
    const { name, value } = e.target;
    setNewDriver(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setNewDriver(prev => ({
      ...prev,
      licenseExpiryDate: date
    }));
  };

  const handleAddDriverSubmit = (e) => {
    e.preventDefault();
    console.log('New Driver to be added:', {
      ...newDriver,
      licenseExpiryDate: newDriver.licenseExpiryDate ? newDriver.licenseExpiryDate.format('YYYY-MM-DD') : null // Format date for submission
    });
    // Here you would typically send this data to your backend API
    // Example: axios.post('/api/drivers', newDriverData)

    handleCloseAddDriverDialog(); // Close the dialog after submission
  };


  return (
    <Box sx={{ p: 2,pt: 0, mt:0,  bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      {/* Page Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search drivers..."
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
                '& fieldset': { borderColor: theme.palette.divider },
                '&:hover fieldset': { borderColor: theme.palette.primary.main },
                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              },
              '& .MuiInputBase-input': { color: theme.palette.text.primary },
              '& .MuiInputBase-input::placeholder': { color: theme.palette.text.secondary, opacity: 1 },
            }}
          />
          {/* Add Driver Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDriverDialog}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
            // /* Added onClick handler */
          >
            Add Driver
          </Button>
        </Box>
      </Box>

      {/* Driver Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {driverOverviewStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{width: '19.7vw'}}>
            <DriverOverviewStatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Filters Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}> {/* flexWrap for responsiveness */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: theme.palette.text.secondary }}>All Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="All Status"
            sx={{
              color: theme.palette.text.primary,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
              '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
            }}
            MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
          >
            <MenuItem value="All Status">All Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="On Trip">On Trip</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: theme.palette.text.secondary }}>All Licenses</InputLabel>
          <Select
            value={licenseFilter}
            onChange={(e) => setLicenseFilter(e.target.value)}
            label="All Licenses"
            sx={{
              color: theme.palette.text.primary,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
              '&:hover fieldset': { borderColor: theme.palette.primary.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
            }}
            MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
          >
            <MenuItem value="All Licenses">All Licenses</MenuItem>
            <MenuItem value="Public-1">Public-1</MenuItem>
            <MenuItem value="Public-2">Public-2</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          size="small"
          onClick={() => setMoreFiltersOpen(true)} // Placeholder for opening more filters
          sx={{
            borderColor: theme.palette.divider,
            color: theme.palette.text.secondary,
            '&:hover': { borderColor: theme.palette.primary.main, bgcolor: theme.palette.action.hover },
          }}
        >
          More Filters
        </Button>
      </Box>

      {/* Driver Profiles */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Driver Profiles
          </Typography>
          <Grid container spacing={3}>
            {driverProfilesData.map((driver, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <DriverProfileCard {...driver} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Driving Behavior Analytics */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Driving Behavior Analytics
          </Typography>
          <Grid container spacing={3}>
            {/* Safety Metrics (Placeholder for Bar Chart) */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: theme.shape.borderRadius,
                p: 3,
                height: 350, // Fixed height for chart area
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Integrating TopDriverPerformance component here */}
                <TopDriverPerformance />
              </Box>
            </Grid>
            {/* Performance Overview (List) */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: theme.shape.borderRadius,
                p: 3,
                height: 350, // Match height of the chart area
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2, fontWeight: 'bold' }}>
                  Performance Overview
                </Typography>
                <Stack spacing={1.5}>
                  {performanceOverviewData.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                        {item.metric}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Trip History Table */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
            Recent Trip History
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Driver', 'Route', 'Distance', 'Duration', 'Status', 'Actions'].map((head) => (
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
                {recentTripHistory.map((trip, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: theme.palette.text.primary, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={trip.avatarUrl} sx={{ width: 32, height: 32 }}>
                        {!trip.avatarUrl && <AccountCircleIcon fontSize="small" />}
                      </Avatar>
                      {trip.driver}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{trip.route}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{trip.distance}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{trip.duration}</TableCell>
                    <TableCell>
                      <Chip
                        label={trip.status}
                        size="small"
                        sx={{
                          bgcolor: trip.status === 'Completed' ? theme.palette.success.light : theme.palette.info.light,
                          color: trip.status === 'Completed' ? theme.palette.success.contrastText : theme.palette.info.contrastText,
                          fontWeight: 'bold',
                          borderRadius: '8px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><RemoveRedEyeIcon fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><GpsFixedIcon fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><CallIcon fontSize="small" /></IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
            Attendance Records
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                {attendanceRecords.overallAttendance}%
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Overall Attendance
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <EventBusyIcon sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 1 }} />
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                {attendanceRecords.absentThisMonth}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Absent This Month
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: theme.palette.error.main, mb: 1 }} />
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                {attendanceRecords.lateArrivals}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Late Arrivals
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* --- Add New Driver Dialog Form (Added from second code) --- */}
      <Dialog
        open={openAddDriverDialog}
        onClose={handleCloseAddDriverDialog}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%',
            maxWidth: '600px', // A bit wider for more fields
          }
        }}
      >
        <DialogTitle sx={{ color: theme.palette.text.primary, pb: 1 }}>Add A New Driver</DialogTitle>
        <Divider sx={{ mb: 2 }} />
        <DialogContent dividers>
          <Box component="form" onSubmit={handleAddDriverSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newDriver.name}
              onChange={handleChangeNewDriver}
              required
              sx={{
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={newDriver.age}
                  onChange={handleChangeNewDriver}
                  inputProps={{ min: "18", max: "99" }}
                  sx={{
                    '& .MuiInputBase-input': { color: theme.palette.text.primary },
                    '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.divider },
                      '&:hover fieldset': { borderColor: theme.palette.primary.main },
                      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth margin="dense" required>
                  <InputLabel id="sex-label" sx={{ color: theme.palette.text.secondary }}>Sex</InputLabel>
                  <Select
                    labelId="sex-label"
                    id="sex"
                    name="sex"
                    value={newDriver.sex}
                    label="Sex"
                    
                    onChange={handleChangeNewDriver}
                    sx={{
                      color: theme.palette.text.primary,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                      '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                      width: '5vw'
                    }}
                    MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                  >
                    <MenuItem value="" sx={{ color: theme.palette.text.secondary }}><em>None</em></MenuItem>
                    <MenuItem value="Male" sx={{ color: theme.palette.text.primary }}>Male</MenuItem>
                    <MenuItem value="Female" sx={{ color: theme.palette.text.primary }}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              margin="dense"
              id="licenseNumber"
              name="licenseNumber"
              label="License Number"
              type="text"
              fullWidth
              variant="outlined"
              value={newDriver.licenseNumber}
              onChange={handleChangeNewDriver}
              required
              sx={{
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
            />

            <FormControl fullWidth margin="dense" required>
              <InputLabel id="license-type-label" sx={{ color: theme.palette.text.secondary }}>License Type</InputLabel>
              <Select
                labelId="license-type-label"
                id="licenseType"
                name="licenseType"
                value={newDriver.licenseType}
                label="License Type"
                onChange={handleChangeNewDriver}
                sx={{
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value="" sx={{ color: theme.palette.text.secondary }}><em>None</em></MenuItem>
                <MenuItem value="Public 1" sx={{ color: theme.palette.text.primary }}>Public 1</MenuItem>
                <MenuItem value="Public 2" sx={{ color: theme.palette.text.primary }}>Public 2</MenuItem>
                {/* Add other license types as needed */}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="License Expiry Date"
                value={newDriver.licenseExpiryDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "dense",
                    variant: "outlined",
                    required: true,
                    sx: {
                      '& .MuiInputBase-input': { color: theme.palette.text.primary },
                      '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                      '& .MuiSvgIcon-root': { color: theme.palette.text.secondary } // Date icon color
                    }
                  }
                }}
              />
            </LocalizationProvider>

            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={newDriver.address}
              onChange={handleChangeNewDriver}
              sx={{
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button
            onClick={handleCloseAddDriverDialog}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            onClick={handleAddDriverSubmit}
            sx={{
              backgroundColor: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.success.dark,
              },
              color: theme.palette.success.contrastText,
            }}
          >
            Add Driver
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriverManagementPage;