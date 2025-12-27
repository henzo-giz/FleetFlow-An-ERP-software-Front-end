// src/pages/ReportsPage/ReportsPage.jsx
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
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons for the page
import DescriptionIcon from '@mui/icons-material/Description'; // Main page icon
import SaveAltIcon from '@mui/icons-material/SaveAlt'; // Export button
import MapIcon from '@mui/icons-material/Map'; // Zone Selector

// Icons for Quick Reports
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Route Compliance
import SecurityIcon from '@mui/icons-material/Security'; // Security Alerts
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'; // Fuel Efficiency
import BuildIcon from '@mui/icons-material/Build'; // Maintenance Overdue

// Icons for Recent Reports Actions
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';

// Reusable component for Quick Report Cards
const QuickReportCard = ({ title, description, icon: IconComponent, color }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        p: 2,
        width: '18.5vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align content to start (left)
        justifyContent: 'space-around',
        color: theme.palette.text.primary,
        borderBottom: `4px solid ${color || theme.palette.primary.main}`, // Color accent at bottom
      }}
    >
      <IconComponent sx={{ fontSize: 40, color: color || theme.palette.primary.main, mb: 1.5 }} />
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
        {description}
      </Typography>
    </Card>
  );
};


const ReportsPage = () => {
  const theme = useTheme();

  // State for Generate Reports form
  const [reportType, setReportType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [driver, setDriver] = useState('');
  const [customer, setCustomer] = useState('');
  const [geographicZone, setGeographicZone] = useState('');
  // Dates will be managed by TextField type="date"

  // State for Fleet Performance Report view (Table/Chart/Export)
  const [fleetPerformanceView, setFleetPerformanceView] = useState('table');


  // Mock Data for Quick Reports
  const quickReportsData = [
    { title: 'Route Compliance', description: 'Today\'s compliance', icon: CheckCircleOutlineIcon, color: theme.palette.success.main },
    { title: 'Security Alerts', description: 'Last 24 hours', icon: SecurityIcon, color: theme.palette.error.main },
    { title: 'Fuel Efficiency', description: 'This Week', icon: LocalGasStationIcon, color: theme.palette.info.main },
    { title: 'Maintenance', description: 'Overdue items', icon: BuildIcon, color: theme.palette.warning.main },
  ];

  // Mock Data for Recent Reports Table
  const recentReports = [
    { reportName: 'Weekly Fleet Performance', type: 'Performance', generated: '2 hours ago', status: 'Complete' },
    { reportName: 'Route Compliance Analysis', type: 'Compliance', generated: '1 day ago', status: 'Complete' },
    { reportName: 'Security Incidents Report', type: 'Security', generated: '2 days ago', status: 'Processing' },
    { reportName: 'Monthly Fuel Summary', type: 'Fuel', generated: '1 week ago', status: 'Complete' },
  ];

  const getReportStatusChipColor = (status) => {
    switch (status) {
      case 'Complete': return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText };
      case 'Processing': return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText };
      default: return { bgcolor: theme.palette.grey[500], color: theme.palette.common.white };
    }
  };

  return (
    <Box sx={{ p: 3,pt: 0, mt: 0, bgcolor: theme.palette.background.default, minHeight: '100%' }}>
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
          {/* <Typography variant="h4" component="h1" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            Reports
          </Typography> */}
          {/* <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Generate and analyze fleet performance reports
          </Typography> */}
        </Box>
        {/* No explicit "Add" button here per design, but could add "Export All" */}
      </Box>

      {/* Generate Reports Section */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Generate Reports
          </Typography>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Report Type</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Report Type"
                  sx={{  width: '7vw',
                    color: theme.palette.text.primary, 
                    '& .MuiOutlinedInput-notchedOutline': 
                    { borderColor: theme.palette.divider }, 
                    '&:hover fieldset': { borderColor: theme.palette.primary.main }, 
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, 
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }, }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  <MenuItem value="">Fleet Performance</MenuItem>
                  <MenuItem value="Fuel">Fuel Usage</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                  <MenuItem value="Driver">Driver Behavior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Vehicle</InputLabel>
                <Select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  label="Vehicle"
                  sx={{  width: '5vw',
                    color: theme.palette.text.primary, 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider }, 
                    '&:hover fieldset': { borderColor: theme.palette.primary.main }, 
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, 
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }, }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  <MenuItem value="">All Vehicles</MenuItem>
                  <MenuItem value="FL-001">FL-001</MenuItem>
                  <MenuItem value="FL-002">FL-002</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Driver</InputLabel>
                <Select
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  label="Driver"
                  sx={{  width: '5vw',
                    color: theme.palette.text.primary, 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider }, 
                    '&:hover fieldset': { borderColor: theme.palette.primary.main }, 
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, 
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }, }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  <MenuItem value="">All Drivers</MenuItem>
                  <MenuItem value="John Smith">John Smith</MenuItem>
                  <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Customer</InputLabel>
                <Select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  label="Customer"
                  sx={{  width: '6vw',
                    color: theme.palette.text.primary, 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider }, 
                    '&:hover fieldset': { borderColor: theme.palette.primary.main }, 
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, 
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }, }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  <MenuItem value="">All Customers</MenuItem>
                  <MenuItem value="ABC Logistics">ABC Logistics</MenuItem>
                  <MenuItem value="XYZ Transport">XYZ Transport</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="date"
                label="Start Date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true, sx: { color: theme.palette.text.secondary } }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, '& fieldset': { borderColor: theme.palette.divider }, '&:hover fieldset': { borderColor: theme.palette.primary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, },
                  '& .MuiInputBase-input': { color: theme.palette.text.primary },
                }}
                defaultValue="2024-01-01"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="date"
                label="End Date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true, sx: { color: theme.palette.text.secondary } }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, '& fieldset': { borderColor: theme.palette.divider }, '&:hover fieldset': { borderColor: theme.palette.primary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, },
                  '& .MuiInputBase-input': { color: theme.palette.text.primary },
                }}
                defaultValue="2024-06-30"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel sx={{ color: theme.palette.text.secondary }}>Geographic Zone</InputLabel>
                <Select
                  value={geographicZone}
                  onChange={(e) => setGeographicZone(e.target.value)}
                  label="Geographic Zone"
                  sx={{  width: '9vw',
                    color: theme.palette.text.primary, 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider }, 
                    '&:hover fieldset': { borderColor: theme.palette.primary.main }, 
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, 
                    '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }, }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
                >
                  <MenuItem value="">All Zones</MenuItem>
                  <MenuItem value="North">North</MenuItem>
                  <MenuItem value="South">South</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': { backgroundColor: theme.palette.primary.dark },
                    fontWeight: 'bold',
                  }}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MapIcon />}
                  sx={{
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.secondary,
                    '&:hover': { borderColor: theme.palette.primary.main, bgcolor: theme.palette.action.hover },
                    fontWeight: 'bold',
                  }}
                >
                  Zone Selector
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Quick Reports Section */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Quick Reports
          </Typography>
          <Grid container spacing={3}>
            {quickReportsData.map((report, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <QuickReportCard {...report} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Fleet Performance Report Section */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
              Fleet Performance Report
            </Typography>
            <ToggleButtonGroup
              value={fleetPerformanceView}
              exclusive
              onChange={(e, newView) => newView !== null && setFleetPerformanceView(newView)}
              size="small"
              sx={{
                bgcolor: theme.palette.background.default,
                '& .MuiToggleButton-root': {
                  color: theme.palette.text.secondary,
                  borderColor: theme.palette.divider,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    bgcolor: theme.palette.action.selected,
                    borderColor: theme.palette.primary.main + '!important',
                  },
                  '&:hover': { bgcolor: theme.palette.action.hover },
                }
              }}
            >
              <ToggleButton value="table">Table</ToggleButton>
              <ToggleButton value="chart">Chart</ToggleButton>
              <ToggleButton value="export" startIcon={<SaveAltIcon />}>Export</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Grid container spacing={3}>
            {/* Fleet Utilization Placeholder */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: theme.shape.borderRadius,
                p: 3,
                height: 250, // Fixed height for content area
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.secondary,
              }}>
                <Typography variant="h6">Fleet Utilization Data (Chart/Table)</Typography>
              </Box>
            </Grid>
            {/* Route Compliance Placeholder */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: theme.shape.borderRadius,
                p: 3,
                height: 250, // Fixed height for content area
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.secondary,
              }}>
                <Typography variant="h6">Route Compliance Data (Chart/Table)</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Reports Table */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
            Recent Reports
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search reports..."
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
              }}
              sx={{
                flexGrow: 1,
                minWidth: '200px',
                '& .MuiOutlinedInput-root': { backgroundColor: theme.palette.background.default, '& fieldset': { borderColor: theme.palette.divider }, '&:hover fieldset': { borderColor: theme.palette.primary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, },
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiInputBase-input::placeholder': { color: theme.palette.text.secondary, opacity: 1 },
              }}
            />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: theme.palette.text.secondary }}>All Types</InputLabel>
              <Select
                defaultValue=""
                label="All Types"
                sx={{ color: theme.palette.text.primary, '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider }, '&:hover fieldset': { borderColor: theme.palette.primary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, '& .MuiSvgIcon-root': { color: theme.palette.text.secondary }, }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Performance">Performance</MenuItem>
                <MenuItem value="Compliance">Compliance</MenuItem>
                <MenuItem value="Security">Security</MenuItem>
                <MenuItem value="Fuel">Fuel</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Report Name', 'Type', 'Generated', 'Status', 'Actions'].map((head) => (
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
                {recentReports.map((report, index) => {
                  const statusColors = getReportStatusChipColor(report.status);
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>{report.reportName}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{report.type}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{report.generated}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
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
                          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><VisibilityIcon fontSize="small" /></IconButton>
                          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}><FileDownloadIcon fontSize="small" /></IconButton>
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
    </Box>
  );
};

export default ReportsPage;
