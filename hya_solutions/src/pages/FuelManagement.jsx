// src/pages/FuelManagementPage/FuelManagementPage.jsx
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
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
  Dialog, // Import Dialog
  DialogTitle, // Import DialogTitle
  DialogContent, // Import DialogContent
  DialogActions, // Import DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons for the page
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

// Icons for Fuel Overview Cards
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Icons for Fuel Alerts
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChartIcon from '@mui/icons-material/BarChart';

// Import your existing FuelConsumptionTrends chart component
import FuelConsumptionTrends from '../components/FuelConsumptionTrends'; // Adjust path as needed

// Reusable component for Fuel Overview Cards (compact design with icon and percentage)
const FuelOverviewStatCard = ({ title, value, percentageChange, unit, icon: IconComponent, color }) => {
  const theme = useTheme();
  const isPositive = percentageChange >= 0;
  const percentageColor = isPositive ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        p: 2,
        height: '100%',
        width: '19vw', // Ensures cards in a grid have consistent height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {IconComponent && <IconComponent sx={{ fontSize: 28, color: color || theme.palette.text.primary }} />}
      </Box>
      <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', mb: 1 }}>
        {value}
        {unit && <Typography component="span" variant="body2" sx={{ color: theme.palette.text.secondary, ml: 0.5 }}>{unit}</Typography>}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {isPositive ? (
          <ArrowUpwardIcon sx={{ fontSize: 16, color: percentageColor }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 16, color: percentageColor }} />
        )}
        <Typography variant="caption" sx={{ color: percentageColor, fontWeight: 'bold' }}>
          {Math.abs(percentageChange)}% {isPositive ? 'efficiency' : 'from last month'}
        </Typography>
      </Box>
    </Card>
  );
};

// Reusable component for Fuel Alert Items
const FuelAlertItem = ({ type, description, time, icon: IconComponent, color }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
      {IconComponent && (
        <IconComponent sx={{ fontSize: 24, color: color || theme.palette.error.main, mt: 0.5 }} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          {type}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          {description}
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.disabled, fontSize: '0.75rem' }}>
          {time}
        </Typography>
      </Box>
    </Box>
  );
};


const FuelManagementPage = () => {
  const theme = useTheme();
  const [chartPeriod, setChartPeriod] = useState('monthly'); // State for chart period (Daily, Weekly, Monthly)
  const [openAddFuelDialog, setOpenAddFuelDialog] = useState(false); // State for the add fuel record dialog

  // State for the new fuel record form
  const [newFuelRecord, setNewFuelRecord] = useState({
    date: '',
    vehicle: '',
    driver: '',
    liters: '',
    cost: '',
    station: '',
  });

  // Handler to open the dialog
  const handleOpenAddFuelDialog = () => {
    setOpenAddFuelDialog(true);
  };

  // Handler to close the dialog
  const handleCloseAddFuelDialog = () => {
    setOpenAddFuelDialog(false);
    // Optionally reset form fields when dialog closes
    setNewFuelRecord({
      date: '',
      vehicle: '',
      driver: '',
      liters: '',
      cost: '',
      station: '',
    });
  };

  // Handler for form field changes
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewFuelRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for submitting the form (add your logic here)
  const handleSubmitFuelRecord = () => {
    console.log('New Fuel Record:', newFuelRecord);
    // Add logic to save the fuel record (e.g., send to backend, update state)
    handleCloseAddFuelDialog(); // Close dialog after submission
  };

  // Mock Data for Fuel Overview Cards
  const fuelOverviewStats = [
    {
      title: 'Monthly Fuel Cost',
      value: '$12,450',
      percentageChange: -8.5,
      unit: '',
      icon: AttachMoneyIcon,
      color: theme.palette.success.main, // Or primary for currency
    },
    {
      title: 'Avg Consumption',
      value: '8.2',
      percentageChange: 2.1,
      unit: 'L/100km',
      icon: LocalGasStationIcon,
      color: theme.palette.info.main,
    },
    {
      title: 'Total Liters',
      value: '8,340',
      percentageChange: 12.5,
      unit: 'Liters',
      icon: EvStationIcon,
      color: theme.palette.warning.main,
    },
    {
      title: 'Fuel Alerts',
      value: 5,
      percentageChange: 0, // No percentage change for alerts, just a count
      unit: 'excessive consumption',
      icon: WarningAmberIcon,
      color: theme.palette.error.main,
    },
  ];

  // Mock Data for Fuel Alerts
  const fuelAlertsData = [
    {
      type: 'High Consumption',
      description: 'Vehicle FL-001 used 150L/100km',
      time: '2 hours ago',
      icon: WarningAmberIcon,
      color: theme.palette.error.main,
    },
    {
      type: 'Budget Alert',
      description: 'Monthly fuel budget 85% used',
      time: '5 hours ago',
      icon: MonetizationOnIcon,
      color: theme.palette.warning.main,
    },
    {
      type: 'Unusual Pattern',
      description: 'FL-003, 2 fuel spikes detected',
      time: '1 day ago',
      icon: BarChartIcon, // Or a different chart/pattern icon
      color: theme.palette.info.main,
    },
  ];

  // Mock Data for Recent Fuel Records Table
  const recentFuelRecords = [
    { date: '2024-01-20', vehicle: 'FL-001', driver: 'John Smith', liters: 65.2, cost: 89.50, station: 'Shell Station A' },
    { date: '2024-01-20', vehicle: 'FL-003', driver: 'Mike Johnson', liters: 78.5, cost: 107.80, station: 'BP Station B' },
    { date: '2024-01-19', vehicle: 'FL-004', driver: 'Sarah Wilson', liters: 45.8, cost: 62.90, station: 'Exxon Station C' },
    { date: '2024-01-18', vehicle: 'FL-002', driver: 'Emily Davis', liters: 55.0, cost: 75.00, station: 'Total Station D' },
  ];

  // Mock Data for Fuel Efficiency Rankings
  const fuelEfficiencyRankings = [
    { rank: 1, vehicle: 'FL-00B', efficiency: '6.8L/100km' },
    { rank: 2, vehicle: 'FL-00C', efficiency: '7.2L/100km' },
    { rank: 3, vehicle: 'FL-001', efficiency: '7.5L/100km' },
  ];

  const handleChartPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) { // Prevents unselecting all toggles
      setChartPeriod(newPeriod);
    }
  };

  return (
    <Box sx={{ p: 3, pt: 0,mt: 0, bgcolor: theme.palette.background.default, minHeight: '100%' }}>
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
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search fuel records..."
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
          {/* Add Fuel Record Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddFuelDialog} // <--- Added onClick handler
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Fuel Record
          </Button>
        </Box>
      </Box>

      {/* Fuel Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {fuelOverviewStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FuelOverviewStatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Main Content Area: Fuel Usage Trends & Recent Records (Left) and Alerts & Rankings & Filters (Right) */}
      <Grid container spacing={3}>
        {/* Left Column: Fuel Usage Trends Chart & Recent Fuel Records */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Fuel Usage Trends Chart */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, width:'60vw' }}>
              <CardContent sx={{ pb: 0, '&:last-child': { pb: 0 } }}> {/* Remove extra padding */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                    Fuel Usage Trends
                  </Typography>
                  <ToggleButtonGroup
                    value={chartPeriod}
                    exclusive
                    onChange={handleChartPeriodChange}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.background.default, // Background for the toggle group
                      '& .MuiToggleButton-root': {
                        color: theme.palette.text.secondary,
                        borderColor: theme.palette.divider,
                        '&.Mui-selected': {
                          color: theme.palette.primary.main,
                          bgcolor: theme.palette.action.selected,
                          borderColor: theme.palette.primary.main + '!important', // Override default border
                        },
                        '&:hover': {
                          bgcolor: theme.palette.action.hover,
                        }
                      }
                    }}
                  >
                    <ToggleButton value="daily">Daily</ToggleButton>
                    <ToggleButton value="weekly">Weekly</ToggleButton>
                    <ToggleButton value="monthly">Monthly</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                {/* Your pre-existing FuelConsumptionTrends component */}
                <FuelConsumptionTrends />
              </CardContent>
            </Card>

            {/* Recent Fuel Records Table */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Recent Fuel Records
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['Date', 'Vehicle', 'Driver', 'Liters', 'Cost', 'Station'].map((head) => (
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
                      {recentFuelRecords.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: theme.palette.text.primary }}>{record.date}</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary }}>{record.vehicle}</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary }}>{record.driver}</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary }}>{record.liters} L</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary }}>${record.cost.toFixed(2)}</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary }}>{record.station}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column: Fuel Alerts & Fuel Efficiency Rankings & Quick Filters */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Fuel Alerts */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Fuel Alerts
                </Typography>
                {fuelAlertsData.map((alert, index) => (
                  <FuelAlertItem key={index} {...alert} />
                ))}
              </CardContent>
            </Card>

            {/* Fuel Efficiency Rankings */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Fuel Efficiency Rankings
                </Typography>
                <Stack spacing={1.5}>
                  {fuelEfficiencyRankings.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32, fontSize: '0.9rem' }}>
                        {item.rank}
                      </Avatar>
                      <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                        {item.vehicle}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 'auto' }}>
                        {item.efficiency}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                  Quick Filters
                </Typography>
                <Stack spacing={2}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel sx={{ color: theme.palette.text.secondary }}>All Vehicles</InputLabel>
                    <Select
                      label="All Vehicles"
                      defaultValue=""
                      sx={{
                        color: theme.palette.text.primary,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                        '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                      }}
                      MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                    >
                      <MenuItem value="">All Vehicles</MenuItem>
                      <MenuItem value="FL-001">FL-001</MenuItem>
                      <MenuItem value="FL-002">FL-002</MenuItem>
                      <MenuItem value="FL-003">FL-003</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel sx={{ color: theme.palette.text.secondary }}>All Drivers</InputLabel>
                    <Select
                      label="All Drivers"
                      defaultValue=""
                      sx={{
                        color: theme.palette.text.primary,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                        '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                      }}
                      MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                    >
                      <MenuItem value="">All Drivers</MenuItem>
                      <MenuItem value="John Smith">John Smith</MenuItem>
                      <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                      <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Date Pickers - using TextField with type="date" for simplicity */}
                  <TextField
                    type="date"
                    label="From Date"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true, sx: { color: theme.palette.text.secondary } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                      '& .MuiInputBase-input': { color: theme.palette.text.primary },
                    }}
                    defaultValue="2024-01-01" // Mock default date
                  />
                    <TextField
                    type="date"
                    label="To Date"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true, sx: { color: theme.palette.text.secondary } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                      '& .MuiInputBase-input': { color: theme.palette.text.primary },
                    }}
                    defaultValue="2024-01-31" // Mock default date
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': { backgroundColor: theme.palette.primary.dark },
                      mt: 2, // Margin top to separate from filters
                    }}
                  >
                    Apply Filters
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Add Fuel Record Dialog Form */}
      <Dialog open={openAddFuelDialog} onClose={handleCloseAddFuelDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Add New Fuel Record
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <Stack spacing={2}>
            {/* Date */}
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={newFuelRecord.date}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
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

            {/* Vehicle */}
            <FormControl fullWidth>
              <InputLabel>Vehicle</InputLabel>
              <Select
                label="Vehicle"
                name="vehicle"
                value={newFuelRecord.vehicle}
                onChange={handleFormChange}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value=""><em>Select Vehicle</em></MenuItem>
                <MenuItem value="FL-001">FL-001</MenuItem>
                <MenuItem value="FL-002">FL-002</MenuItem>
                <MenuItem value="FL-003">FL-003</MenuItem>
                <MenuItem value="FL-004">FL-004</MenuItem>
              </Select>
            </FormControl>

            {/* Driver */}
            <FormControl fullWidth>
              <InputLabel>Driver</InputLabel>
              <Select
                label="Driver"
                name="driver"
                value={newFuelRecord.driver}
                onChange={handleFormChange}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value=""><em>Select Driver</em></MenuItem>
                <MenuItem value="John Smith">John Smith</MenuItem>
                <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                <MenuItem value="Emily Davis">Emily Davis</MenuItem>
              </Select>
            </FormControl>

            {/* Liters */}
            <TextField
              fullWidth
              label="Liters"
              name="liters"
              type="number"
              value={newFuelRecord.liters}
              onChange={handleFormChange}
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

            {/* Cost */}
            <TextField
              fullWidth
              label="Cost"
              name="cost"
              type="number"
              value={newFuelRecord.cost}
              onChange={handleFormChange}
              InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: theme.palette.text.secondary }}>$</Typography> }}
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

            {/* Station */}
            <TextField
              fullWidth
              label="Station"
              name="station"
              value={newFuelRecord.station}
              onChange={handleFormChange}
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
          <Button onClick={handleCloseAddFuelDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitFuelRecord}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Record
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FuelManagementPage;