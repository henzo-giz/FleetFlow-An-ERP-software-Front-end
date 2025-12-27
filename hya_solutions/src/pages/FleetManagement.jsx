// src/pages/FleetManagementPage/FleetManagementPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Dialog,         // Import Dialog for the modal
  DialogTitle,    // Import DialogTitle
  DialogContent,  // Import DialogContent
  DialogActions,  // Import DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons for the page header and overview cards
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

// Import your custom components
import FleetOverviewCard from '../components/FleetOverviewCard';
import VehicleListItem from '../components/VehicleListItem';

const FleetManagementPage = () => {
  const theme = useTheme();
  const [statusFilter, setStatusFilter] = useState('All Status'); // State for the status filter

  // --- State for Add New Vehicle Form Dialog ---
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    driver: '', // Store driver ID or name depending on your backend
    plateNumber: '',
    vehicleModel: '',
    productionYear: '',
  });

  // Mock Data for Fleet Overview Cards
  const fleetOverviewData = [
    { title: 'Active Vehicles', count: 24, icon: DirectionsCarFilledIcon, color: theme.palette.success.main },
    { title: 'In Repair', count: 3, icon: BuildCircleIcon, color: theme.palette.warning.main },
    { title: 'Idle', count: 8, icon: AccessTimeFilledIcon, color: theme.palette.info.main },
    { title: 'Under Inspection', count: 2, icon: AssignmentTurnedInIcon, color: theme.palette.primary.main },
  ];

  // Mock Data for Vehicle Fleet List
  const mockVehicles = [
    {
      id: 'FL-001',
      name: 'Mercedes Sprinter',
      driver: 'John Smith',
      location: 'Route: City Center',
      status: 'Active',
      lastUpdate: '2 min ago'
    },
    {
      id: 'FL-002',
      name: 'Ford Transit',
      driver: 'Samantha Lee',
      location: 'Service Center',
      status: 'In Repair',
      lastUpdate: 'ETA: 3 days'
    },
    {
      id: 'FL-003',
      name: 'Volvo FM18',
      driver: 'Mike Johnson',
      location: 'Route: Highway A1',
      status: 'Active',
      lastUpdate: '1 min ago'
    },
    {
      id: 'FL-004',
      name: 'Scania R450',
      driver: 'David Kim',
      location: 'Depot',
      status: 'Idle',
      lastUpdate: 'Parked: 4 hours ago'
    },
    {
      id: 'FL-005',
      name: 'Man TGX',
      driver: 'Emily White',
      location: 'Under Inspection',
      status: 'Under Inspection',
      lastUpdate: 'Scheduled: Today'
    },
  ];

  // Mock Data for Live GPS Tracking List
  const liveTrackingVehicles = [
    { id: 'FL-001', location: 'City Center', status: 'Active' },
    { id: 'FL-003', location: 'Highway A1', status: 'Active' },
    { id: 'FL-002', location: 'Service Center', status: 'In Repair' },
    // Add more if needed
  ];

  // Mock Drivers for the dropdown
  const mockDrivers = [
    { id: 'driver1', name: 'John Smith' },
    { id: 'driver2', name: 'Samantha Lee' },
    { id: 'driver3', name: 'Mike Johnson' },
    { id: 'driver4', name: 'David Kim' },
    { id: 'driver5', name: 'Emily White' },
    { id: 'driver6', name: 'Alex Green' },
  ];

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    // In a real app, you'd filter mockVehicles here
  };

  const getStatusColorForLiveTracking = (status) => {
    switch (status) {
      case 'Active': return theme.palette.success.main;
      case 'In Repair': return theme.palette.warning.main;
      case 'Idle': return theme.palette.info.main;
      case 'Under Inspection': return theme.palette.primary.main;
      default: return theme.palette.grey[500];
    }
  };

  // --- Add Vehicle Form Handlers ---
  const handleOpenAddVehicleDialog = () => {
    setOpenAddVehicleDialog(true);
  };

  const handleCloseAddVehicleDialog = () => {
    setOpenAddVehicleDialog(false);
    // Optionally reset form fields when closing
    setNewVehicle({
      name: '',
      driver: '',
      plateNumber: '',
      vehicleModel: '',
      productionYear: '',
    });
  };

  const handleChangeNewVehicle = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddVehicleSubmit = (e) => {
    e.preventDefault();
    console.log('New Vehicle to be added:', newVehicle);
    // Here you would typically send this data to your backend API
    // Example: axios.post('/api/vehicles', newVehicle)
    // After successful submission, you would refresh your vehicle list.

    // For now, let's just close the dialog
    handleCloseAddVehicleDialog();
  };


  return (
    <Box sx={{ p: 2, pt: 0,mt: 0, bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3, // margin-bottom
        }}
      >
        <Box>
        </Box >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search vehicles..."
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
                '& fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
              },
              '& .MuiInputBase-input::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 1, // Fix for Firefox placeholder opacity
              },
            }}
          />
          {/* Add Vehicle Button - Now opens the dialog */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddVehicleDialog} // <-- Add this onClick handler
            sx={{
              backgroundColor: theme.palette.primary.main, // Use primary color from theme
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Add A New Vehicle
          </Button>
        </Box>
      </Box>

      {/* Fleet Overview Cards */}
      <Grid container spacing={3} sx={{ p: 0, mb: 4, justifyContent:'center'}}>
        {fleetOverviewData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{width: '19.7vw'}}> {/* Responsive grid items */}
            <FleetOverviewCard
              title={data.title}
              count={data.count}
              icon={data.icon}
              color={data.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Vehicle Fleet and Live GPS Tracking Sections */}
      <Grid container spacing={3}>
        {/* Vehicle Fleet Section (2/3 width on md and up) */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              p: 3,
              borderRadius: theme.shape.borderRadius,
              minHeight: '400px',
              width: '51vw', // Adjusted height for content
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                Vehicle Fleet
              </Typography>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Status"
                  sx={{
                    color: theme.palette.text.primary,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '& .MuiSvgIcon-root': { // Style the dropdown arrow
                      color: theme.palette.text.secondary,
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: theme.palette.background.paper, // Menu dropdown background
                        boxShadow: theme.shadows[3],
                      },
                    },
                  }}
                >
                  <MenuItem value="All Status" sx={{ color: theme.palette.text.primary }}>All Status</MenuItem>
                  <MenuItem value="Active" sx={{ color: theme.palette.text.primary }}>Active</MenuItem>
                  <MenuItem value="In Repair" sx={{ color: theme.palette.text.primary }}>In Repair</MenuItem>
                  <MenuItem value="Idle" sx={{ color: theme.palette.text.primary }}>Idle</MenuItem>
                  <MenuItem value="Under Inspection" sx={{ color: theme.palette.text.primary }}>Under Inspection</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Vehicle list content */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}> {/* Added pr for scrollbar spacing */}
              {mockVehicles.map((vehicle, index) => (
                <VehicleListItem
                  key={index} // Using index as key for mock data, ideally use a unique ID
                  vehicleId={vehicle.id}
                  vehicleName={vehicle.name}
                  driver={vehicle.driver}
                  location={vehicle.location}
                  status={vehicle.status}
                  lastUpdate={vehicle.lastUpdate}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Live GPS Tracking Section (1/3 width on md and up) */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              p: 3,
              borderRadius: theme.shape.borderRadius,
              minHeight: '400px',
              width: '30vw', // Adjusted height for content
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
              Live GPS Tracking
            </Typography>

            {/* Map Placeholder */}
            <Box
              sx={{
                bgcolor: theme.palette.grey[900], // Dark grey background for map placeholder
                borderRadius: theme.shape.borderRadius,
                height: 200, // Fixed height for the placeholder
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <GpsFixedIcon sx={{ fontSize: 60, color: theme.palette.grey[700], mb: 1 }} />
              <Typography variant="subtitle1" sx={{ color: theme.palette.grey[500], fontWeight: 'bold' }}>
                GPS Map Integration
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.grey[600] }}>
                Real-time vehicle tracking
              </Typography>
            </Box>

            {/* Vehicle Tracking List */}
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
              Currently Tracking:
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {liveTrackingVehicles.map((vehicle, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: getStatusColorForLiveTracking(vehicle.status), // Use status to determine color
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                    {vehicle.id} <span style={{ color: theme.palette.text.secondary }}>{vehicle.location}</span>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* --- Add New Vehicle Dialog Form --- */}
      <Dialog
        open={openAddVehicleDialog}
        onClose={handleCloseAddVehicleDialog}
        PaperProps={{ // Style the dialog background
          sx: {
            bgcolor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%', // Make it responsive
            maxWidth: '500px', // Max width for larger screens
          }
        }}
      >
        <DialogTitle sx={{ color: theme.palette.text.primary, pb: 1 }}>Add A New Vehicle</DialogTitle>
        <Divider sx={{ mb: 2 }} />
        <DialogContent dividers> {/* `dividers` adds a divider above and below content */}
          <Box component="form" onSubmit={handleAddVehicleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus // Automatically focus this field when dialog opens
              margin="dense"
              id="name"
              name="name"
              label="Vehicle Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newVehicle.name}
              onChange={handleChangeNewVehicle}
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
              <InputLabel id="driver-label" sx={{ color: theme.palette.text.secondary }}>Driver</InputLabel>
              <Select
                labelId="driver-label"
                id="driver"
                name="driver"
                value={newVehicle.driver}
                label="Driver"
                onChange={handleChangeNewVehicle}
                sx={{
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary } // Dropdown arrow color
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: theme.palette.background.paper,
                      boxShadow: theme.shadows[3],
                    },
                  },
                }}
              >
                <MenuItem value="" sx={{ color: theme.palette.text.secondary }}>
                  <em>None</em>
                </MenuItem>
                {mockDrivers.map((driver) => (
                  <MenuItem key={driver.id} value={driver.name} sx={{ color: theme.palette.text.primary }}>
                    {driver.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="plateNumber"
              name="plateNumber"
              label="Plate Number"
              type="text"
              fullWidth
              variant="outlined"
              value={newVehicle.plateNumber}
              onChange={handleChangeNewVehicle}
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
            <TextField
              margin="dense"
              id="vehicleModel"
              name="vehicleModel"
              label="Vehicle Model"
              type="text"
              fullWidth
              variant="outlined"
              value={newVehicle.vehicleModel}
              onChange={handleChangeNewVehicle}
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
            <TextField
              margin="dense"
              id="productionYear"
              name="productionYear"
              label="Production Year"
              type="number" // Set type to number for year input
              fullWidth
              variant="outlined"
              value={newVehicle.productionYear}
              onChange={handleChangeNewVehicle}
              required
              inputProps={{ min: "1900", max: new Date().getFullYear() + 5 }} // Example year range
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
            onClick={handleCloseAddVehicleDialog}
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
            type="submit" // Set type to submit for form submission
            variant="contained"
            onClick={handleAddVehicleSubmit}
            sx={{
              backgroundColor: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.success.dark,
              },
              color: theme.palette.success.contrastText,
            }}
          >
            Add Vehicle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FleetManagementPage;