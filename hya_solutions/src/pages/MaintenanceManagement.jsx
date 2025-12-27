// src/pages/MaintenanceManagementPage/MaintenanceManagementPage.jsx
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
  Dialog, // Added for the form dialog
  DialogTitle, // Added for the form dialog
  DialogContent, // Added for the form dialog
  DialogActions, // Added for the form dialog
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Ensure dayjs is imported if you use it directly

// Icons for the page
import BuildIcon from '@mui/icons-material/Build'; // Main page icon / Schedule Service button
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Overdue alert, general warning
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Due This Week alert
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Up to Date alert, Complete status
import SearchIcon from '@mui/icons-material/Search'; // Search input
import EditIcon from '@mui/icons-material/Edit'; // Edit action
import VisibilityIcon from '@mui/icons-material/Visibility'; // View action

// New reusable component for service alert cards
// You should save this in src/components/ServiceAlertCard/ServiceAlertCard.jsx
const ServiceAlertCard = ({ title, count, description, icon: IconComponent, color }) => {
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
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.text.primary,
        borderLeft: `5px solid ${color || theme.palette.grey[500]}`, // Color stripe on the left
      }}
    >
      <IconComponent sx={{ fontSize: 48, color: color || theme.palette.grey[500], mb: 1 }} />
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
        {count}
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, px: 1 }}>
        {description}
      </Typography>
    </Card>
  );
};

// New reusable component for individual Vehicle Maintenance History Cards
// You should save this in src/components/VehicleMaintenanceHistoryCard/VehicleMaintenanceHistoryCard.jsx
const VehicleMaintenanceHistoryCard = ({ vehicleId, year, model, lastService, mileage, nextService, isOverdue }) => {
  const theme = useTheme();
  const nextServiceColor = isOverdue ? theme.palette.error.main : theme.palette.success.main;

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
        color: theme.palette.text.primary,
      }}
    >
      <CardContent sx={{ pb: 0, '&:last-child': { pb: 2 } }}> {/* Adjust padding */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {vehicleId} - {year} {model}
        </Typography>
        <Stack spacing={0.5} mb={2}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Last Service: <span style={{ fontWeight: 'bold', color: theme.palette.text.primary }}>{lastService}</span>
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Mileage: <span style={{ fontWeight: 'bold', color: theme.palette.text.primary }}>{mileage} km</span>
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Next Service: <span style={{ fontWeight: 'bold', color: nextServiceColor }}>{nextService}</span>
            {isOverdue && <Chip label="Overdue" size="small" color="error" sx={{ ml: 1, height: '18px' }} />}
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.background.paper,
            },
          }}
        >
          View Full History
        </Button>
      </CardContent>
    </Card>
  );
};


const MaintenanceManagementPage = () => {
  const theme = useTheme();
  const [vehicleFilter, setVehicleFilter] = useState('All Vehicles'); // State for records table filter

  // State for the Schedule Service dialog
  const [openScheduleServiceDialog, setOpenScheduleServiceDialog] = useState(false);
  // State for the new service record form
  const [newServiceRecord, setNewServiceRecord] = useState({
    date: null, // Using Dayjs object for DatePicker
    vehicle: '',
    serviceType: '',
    mechanic: '',
    cost: '',
  });

  // Handler to open the dialog
  const handleOpenScheduleServiceDialog = () => {
    setOpenScheduleServiceDialog(true);
  };

  // Handler to close the dialog
  const handleCloseScheduleServiceDialog = () => {
    setOpenScheduleServiceDialog(false);
    // Optionally reset form fields when dialog closes
    setNewServiceRecord({
      date: null,
      vehicle: '',
      serviceType: '',
      mechanic: '',
      cost: '',
    });
  };

  // Handler for form field changes
  const handleServiceFormChange = (event) => {
    const { name, value } = event.target;
    setNewServiceRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for DatePicker change
  const handleServiceDateChange = (date) => {
    setNewServiceRecord((prev) => ({
      ...prev,
      date: date,
    }));
  };

  // Handler for submitting the form (add your logic here)
  const handleSubmitServiceRecord = () => {
    console.log('New Service Record:', {
      ...newServiceRecord,
      date: newServiceRecord.date ? newServiceRecord.date.format('YYYY-MM-DD') : null // Format date for submission
    });
    // Add logic to save the service record (e.g., send to backend, update state)
    handleCloseScheduleServiceDialog(); // Close dialog after submission
  };


  // Mock Data for Service Alerts
  const serviceAlertsData = [
    { title: 'Overdue Services', count: 3, description: 'Vehicles need immediate attention', icon: WarningAmberIcon, color: theme.palette.error.main },
    { title: 'Due This Week', count: 7, description: 'Scheduled services', icon: AccessTimeIcon, color: theme.palette.warning.main },
    { title: 'Up to Date', count: 45, description: 'Vehicles maintained', icon: CheckCircleOutlineIcon, color: theme.palette.success.main },
  ];

  // Mock Data for Schedule Vehicle Service form (already present)
  const vehicleOptions = ['FL-001', 'FL-002', 'FL-003', 'FL-004'];
  const serviceTypeOptions = ['Oil Change', 'Brake Repair', 'Tire Rotation', 'Engine Check', 'Tire Change', 'Battery Replacement']; // Added more options for variety
  const mechanicOptions = ['John Smith', 'Mike Johnson', 'Sarah Wilson', 'Abebe Kebede', 'Chala Bultuma']; // Added more options for variety

  // Mock Data for Maintenance Records & Repairs
  const maintenanceRecords = [
    { date: '2024-08-15', vehicleId: 'FL-001', serviceType: 'Oil Change', mechanic: 'John Smith', cost: 2500.00, status: 'Complete' },
    { date: '2024-08-14', vehicleId: 'FL-002', serviceType: 'Brake Repair', mechanic: 'Mike Johnson', cost: 3450.00, status: 'In Progress' },
    { date: '2024-08-12', vehicleId: 'FL-003', serviceType: 'Tire Rotation', mechanic: 'Sarah Wilson', cost: 650.00, status: 'Complete' },
    { date: '2024-08-10', vehicleId: 'FL-004', serviceType: 'Engine Check', mechanic: 'John Smith', cost: 1800.00, status: 'Pending' },
  ];

  // Mock Data for Vehicle Maintenance History
  const vehicleHistoryData = [
    { vehicleId: 'FL-001', year: 2019, model: 'Ford Ranger', lastService: 'Jun 15, 2025', mileage: '75,432', nextService: 'Aug 15, 2025', isOverdue: false },
    { vehicleId: 'FL-002', year: 2020, model: 'Toyota Hilux', lastService: 'Jun 10, 2025', mileage: '62,187', nextService: 'Overdue', isOverdue: true },
    { vehicleId: 'FL-003', year: 2021, model: 'Toyota Land Cruiser', lastService: 'Jun 12, 2025', mileage: '45,923', nextService: 'Sep 12, 2025', isOverdue: false },
  ];

  return (
    <Box sx={{ p: 3, pt:0, bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      {/* Page Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          {/* <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Manage vehicle maintenance, repairs, and service scheduling
          </Typography> */}
        </Box>
        <Button
          variant="contained"
          startIcon={<BuildIcon />}
          onClick={handleOpenScheduleServiceDialog}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Schedule Service
        </Button>
      </Box>

      {/* Service Alerts & Predictions */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Service Alerts & Predictions
          </Typography>
          <Grid container spacing={3} sx={{justifyContent:'space-evenly'}}>
            {serviceAlertsData.map((alert, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ServiceAlertCard {...alert} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Schedule Vehicle Service Form (Existing section, but now the button opens a dialog) */}
      {/* This section is still here for context, but the new form will be in the Dialog */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Schedule Vehicle Service (Quick Form)
          </Typography>
          <Grid container spacing={3} alignItems="flex-end"> {/* Align items to bottom for consistent sizing */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Vehicle ID</InputLabel>
                <Select
                  label="Vehicle ID"
                  defaultValue=""
                  sx={{
                    width: '150px',
                    color: theme.palette.text.primary,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                    '&:hover fieldset': { borderColor: theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                  }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  {vehicleOptions.map((id) => (
                    <MenuItem key={id} value={id}>{id}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Service Type</InputLabel>
                <Select
                  label="Service Type"
                  defaultValue=""
                  sx={{
                    width: '150px',
                    color: theme.palette.text.primary,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                    '&:hover fieldset': { borderColor: theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                  }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  {serviceTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="date"
                label="Service Date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true, sx: { color: theme.palette.text.secondary } }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    '& fieldset': { borderColor: theme.palette.divider },
                    '&:hover fieldset': { borderColor: theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                  },
                  '& .MuiInputBase-input': { color: theme.palette.text.primary },
                }}
                defaultValue="2025-06-30" // Mock default date
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Assigned Mechanic</InputLabel>
                <Select
                  label="Assigned Mechanic"
                  defaultValue=""
                  sx={{
                    width: '200px',
                    color: theme.palette.text.primary,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                    '&:hover fieldset': { borderColor: theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                  }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  {mechanicOptions.map((mechanic) => (
                    <MenuItem key={mechanic} value={mechanic}>{mechanic}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.primary.dark },
                  mt: 2, // Margin top to separate from filters
                }}
              >
                Submit Quick Schedule
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Maintenance Records & Repairs Table */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
            Maintenance Records & Repairs
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search records..."
              size="small"
              sx={{
                flexGrow: 1,
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
              <InputLabel sx={{ color: theme.palette.text.secondary }}>All Vehicles</InputLabel>
              <Select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                label="All Vehicles"
                sx={{
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value="All Vehicles">All Vehicles</MenuItem>
                {vehicleOptions.map((id) => (
                  <MenuItem key={id} value={id}>{id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Date', 'Vehicle ID', 'Service Type', 'Mechanic', 'Cost(Birr)', 'Status', 'Actions'].map((head) => (
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
                {maintenanceRecords.map((record, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.date}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.vehicleId}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.serviceType}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.mechanic}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>${record.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        size="small"
                        sx={{
                          bgcolor: record.status === 'Complete' ? theme.palette.success.light : (record.status === 'In Progress' ? theme.palette.info.light : theme.palette.grey[500]),
                          color: record.status === 'Complete' ? theme.palette.success.contrastText : (record.status === 'In Progress' ? theme.palette.info.contrastText : theme.palette.common.white),
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Vehicle Maintenance History */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Vehicle Maintenance History
          </Typography>
          <Grid container spacing={3}>
            {vehicleHistoryData.map((history, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <VehicleMaintenanceHistoryCard {...history} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Add New Service Record Dialog Form */}
      <Dialog open={openScheduleServiceDialog} onClose={handleCloseScheduleServiceDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Schedule New Service
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <Stack spacing={2}>
            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Service Date"
                value={newServiceRecord.date}
                onChange={handleServiceDateChange}
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

            {/* Vehicle */}
            <FormControl fullWidth margin="dense">
              <InputLabel sx={{ color: theme.palette.text.secondary }}>Vehicle</InputLabel>
              <Select
                label="Vehicle"
                name="vehicle"
                value={newServiceRecord.vehicle}
                onChange={handleServiceFormChange}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value=""><em>Select Vehicle</em></MenuItem>
                {vehicleOptions.map((vehicle) => (
                  <MenuItem key={vehicle} value={vehicle}>{vehicle}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Service Type */}
            <FormControl fullWidth margin="dense">
              <InputLabel sx={{ color: theme.palette.text.secondary }}>Service Type</InputLabel>
              <Select
                label="Service Type"
                name="serviceType"
                value={newServiceRecord.serviceType}
                onChange={handleServiceFormChange}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value=""><em>Select Service Type</em></MenuItem>
                {serviceTypeOptions.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Mechanic */}
            <FormControl fullWidth margin="dense">
              <InputLabel sx={{ color: theme.palette.text.secondary }}>Mechanic</InputLabel>
              <Select
                label="Mechanic"
                name="mechanic"
                value={newServiceRecord.mechanic}
                onChange={handleServiceFormChange}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value=""><em>Select Mechanic</em></MenuItem>
                {mechanicOptions.map((mechanic) => (
                  <MenuItem key={mechanic} value={mechanic}>{mechanic}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Cost */}
            <TextField
              fullWidth
              label="Cost (Birr)"
              name="cost"
              type="number"
              value={newServiceRecord.cost}
              onChange={handleServiceFormChange}
              margin="dense"
              InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: theme.palette.text.secondary }}>Birr</Typography> }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
          <Button onClick={handleCloseScheduleServiceDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitServiceRecord}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaintenanceManagementPage;