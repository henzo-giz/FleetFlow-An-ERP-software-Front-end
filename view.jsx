// src/pages/AccountingFinancePage/AccountingFinancePage.jsx
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
  Pagination, // For recent invoices table
  Dialog, // Added for the form dialog
  DialogTitle, // Added for the form dialog
  DialogContent, // Added for the form dialog
  DialogActions, // Added for the form dialog
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Date Pickers Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Make sure dayjs is imported

// Icons for the page
import AddIcon from '@mui/icons-material/Add'; // New Transaction button, Add item in management sections
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Main page icon
import SearchIcon from '@mui/icons-material/Search'; // Search invoices input

// Icons for Financial Overview Metrics
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Total Revenue, Net Profit
import MoneyOffIcon from '@mui/icons-material/MoneyOff'; // Total Expenses
import ReceiptIcon from '@mui/icons-material/Receipt'; // Outstanding Invoices
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // General positive trend

// Icons for Quick Actions
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // Create Invoice
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Record Payment
import BarChartIcon from '@mui/icons-material/BarChart'; // Payroll Management, Financial Reports (general chart icon)

// Icons for Recent Invoices Actions
import VisibilityIcon from '@mui/icons-material/Visibility'; // View
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Download

// Import your FinancialOverview chart component
import FinancialOverview from '../components/FinancialOverview'; // Adjust path as needed


// Reusable component for Financial Overview Metric Cards
const FinancialMetricCard = ({ title, value, icon: IconComponent, color, trendIcon: TrendIconComponent }) => {
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
        {IconComponent && <IconComponent sx={{ fontSize: 28, color: color || theme.palette.text.primary }} />}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
      {TrendIconComponent && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <TrendIconComponent sx={{ fontSize: 16, color: color || theme.palette.text.secondary }} />
          {/* Add a subtle trend text here if needed, based on specific data */}
        </Box>
      )}
    </Card>
  );
};

// Reusable component for Income/Expense List Items (e.g., Trip Payments, Fuel Costs)
const ManagementListItem = ({ label, amount, isIncome }) => {
  const theme = useTheme();
  const textColor = isIncome ? theme.palette.success.main : theme.palette.error.main;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
      <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: textColor, fontWeight: 'bold' }}>
        {amount}
      </Typography>
    </Box>
  );
};

const AccountingFinancePage = () => {
  const theme = useTheme();
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('All Status');
  const [invoicePage, setInvoicePage] = useState(1); // For invoice table pagination

  // --- State for Add Transaction Dialog (Existing) ---
  const [openAddTransactionDialog, setOpenAddTransactionDialog] = useState(false);
  const [newTransactionData, setNewTransactionData] = useState({
    date: null,
    client: '',
    amount: '',
    dueDate: null,
  });

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
    startDate: null,
    eta: null,
  });

  // --- Handlers for Add Transaction Dialog (Existing) ---
  const handleOpenAddTransactionDialog = () => {
    setOpenAddTransactionDialog(true);
  };

  const handleCloseAddTransactionDialog = () => {
    setOpenAddTransactionDialog(false);
    setNewTransactionData({
      date: null,
      client: '',
      amount: '',
      dueDate: null,
    });
  };

  const handleTransactionFormChange = (event) => {
    const { name, value } = event.target;
    setNewTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransactionDateChange = (date, name) => {
    setNewTransactionData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleAddTransactionSubmit = () => {
    console.log('New Transaction to be added:', {
      ...newTransactionData,
      date: newTransactionData.date ? newTransactionData.date.format('YYYY-MM-DD') : '',
      dueDate: newTransactionData.dueDate ? newTransactionData.dueDate.format('YYYY-MM-DD') : '',
    });
    handleCloseAddTransactionDialog();
  };

  // --- New Handlers for New Client Dialog ---
  const handleOpenNewClientDialog = () => {
    setOpenNewClientDialog(true);
  };

  const handleCloseNewClientDialog = () => {
    setOpenNewClientDialog(false);
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
    handleCloseNewClientDialog();
  };

  // --- New Handlers for New Trip Dialog ---
  const handleOpenNewTripDialog = () => {
    setOpenNewTripDialog(true);
  };

  const handleCloseNewTripDialog = () => {
    setOpenNewTripDialog(false);
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
      [name]: date,
    }));
  };

  const handleAddNewTripSubmit = () => {
    console.log('New Trip to be added:', {
      ...newTripData,
      startDate: newTripData.startDate ? newTripData.startDate.format('YYYY-MM-DD') : '',
      eta: newTripData.eta ? newTripData.eta.format('YYYY-MM-DD HH:mm') : '', // Assuming ETA might include time
    });
    handleCloseNewTripDialog();
  };


  // Mock Data for Financial Overview Metrics
  const financialMetrics = [
    { title: 'Total Revenue(Birr)', value: '1,274,500', icon: AttachMoneyIcon, color: theme.palette.success.main },
    { title: 'Total Expenses', value: '893,202', icon: MoneyOffIcon, color: theme.palette.error.main },
    { title: 'Outstanding Invoices', value: '238,900', icon: ReceiptIcon, color: theme.palette.warning.main },
    { title: 'Net Profit', value: '381,300', icon: AttachMoneyIcon, color: theme.palette.primary.main, trendIcon: TrendingUpIcon },
  ];

  // Mock Data for Income Management
  const incomeItems = [
    { label: 'Trip Payments', amount: '45,230' },
    { label: 'Fuel Surcharges', amount: '72,890' },
    { label: 'Service Fees', amount: '28,450' },
  ];

  // Mock Data for Expense Management
  const expenseItems = [
    { label: 'Fuel Costs', amount: '134,560' },
    { label: 'Maintenance', amount: '88,230' },
    { label: 'Insurance', amount: '62,450' },
  ];

  // Mock Data for Quick Actions buttons
  const quickActions = [
    { label: 'Create Invoice', icon: ReceiptLongIcon, color: theme.palette.primary.main },
    { label: 'Record Payment', icon: CreditCardIcon, color: theme.palette.success.main },
    { label: 'Payroll Management', icon: BarChartIcon, color: theme.palette.info.main },
    { label: 'Financial Reports', icon: BarChartIcon, color: theme.palette.warning.main },
  ];

  // Mock Data for Recent Invoices Table
  const recentInvoices = [
    { invoiceNum: '#INV-2024-001', client: 'ABC Logistics', amount: '25,450', dueDate: 'Jan 15, 2025', status: 'Paid' },
    { invoiceNum: '#INV-2024-002', client: 'XYZ Transport', amount: '43,200', dueDate: 'Jun 20, 2025', status: 'Pending' },
    { invoiceNum: '#INV-2024-003', client: 'TransLink Corp.', amount: '18,500', dueDate: 'Mar 10, 2025', status: 'Paid' },
    { invoiceNum: '#INV-2024-004', client: 'City Movers', amount: '30,100', dueDate: 'Feb 28, 2025', status: 'Overdue' },
    { invoiceNum: '#INV-2024-005', client: 'Global Freight', amount: '50,000', dueDate: 'Apr 05, 2025', status: 'Paid' },
    { invoiceNum: '#INV-2024-006', client: 'Express Delivery', amount: '22,000', dueDate: 'Jul 10, 2025', status: 'Pending' },
  ];

  // Pagination logic for invoices
  const invoicesPerPage = 3; // Display 3 invoices per page
  const totalInvoicePages = Math.ceil(recentInvoices.length / invoicesPerPage);
  const paginatedInvoices = recentInvoices.slice(
    (invoicePage - 1) * invoicesPerPage,
    invoicePage * invoicesPerPage
  );

  const handleInvoicePageChange = (event, value) => {
    setInvoicePage(value);
  };

  const getInvoiceStatusChipColor = (status) => {
    switch (status) {
      case 'Paid': return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText };
      case 'Pending': return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText };
      case 'Overdue': return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText };
      default: return { bgcolor: theme.palette.grey[500], color: theme.palette.common.white };
    }
  };

  return (
    <Box sx={{ p: 3, pt: 0, mt: 0, bgcolor: theme.palette.background.default, minHeight: '100%', justifyContent: 'space-around' }}>
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
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Manage your fleet's financial operations
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}> {/* Replaced single button with Stack for multiple buttons */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenNewClientDialog} // Open New Client Dialog
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
            onClick={handleOpenNewTripDialog} // Open New Trip Dialog
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            New Trip
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddTransactionDialog}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            New Transaction
          </Button>
        </Stack>
      </Box>

      {/* Financial Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {financialMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FinancialMetricCard {...metric} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section: Profit & Loss Trend and Cash Flow */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Profit & Loss Trend (FinancialOverview Chart) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                Profit & Loss Trend
              </Typography>
              {/* Integrate your FinancialOverview component here */}
              <FinancialOverview />
            </CardContent>
          </Card>
        </Grid>
        {/* Cash Flow (Placeholder) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                Cash Flow
              </Typography>
              <Box
                sx={{
                  bgcolor: theme.palette.background.default,
                  borderRadius: theme.shape.borderRadius,
                  height: 300,
                  width: '36vw', // Fixed height for chart area
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.palette.text.secondary,
                }}
              >
                <Typography variant="h6">Cash Flow Bar Chart Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Income Management, Expense Management, Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'space-between' }}>
        {/* Income Management */}
        <Grid item xs={12} md={4} sx={{ width: '26vw' }}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                  Income Management
                </Typography>
                <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Stack divider={<Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, my: '4px' }} />} spacing={0}>
                {incomeItems.map((item, index) => (
                  <ManagementListItem key={index} label={item.label} amount={item.amount} isIncome={true} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Expense Management */}
        <Grid item xs={12} md={4} sx={{ width: '26vw' }}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                  Expense Management
                </Typography>
                <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Stack divider={<Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, my: '4px' }} />} spacing={0}>
                {expenseItems.map((item, index) => (
                  <ManagementListItem key={index} label={item.label} amount={item.amount} isIncome={false} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4} sx={{ width: '26vw' }}>
          <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    startIcon={<action.icon />}
                    fullWidth
                    sx={{
                      backgroundColor: action.color,
                      '&:hover': { bgcolor: action.color && `${action.color}d0` }, // Slightly darker on hover
                      color: theme.palette.common.white,
                      fontWeight: 'bold',
                      borderRadius: theme.shape.borderRadius,
                      py: 1.5,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Invoices Table */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
            Recent Invoices
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search invoices..."
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
              }}
              sx={{
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
                value={invoiceStatusFilter}
                onChange={(e) => setInvoiceStatusFilter(e.target.value)}
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
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Invoice #', 'Client', 'Amount', 'Due Date', 'Status', 'Actions'].map((head) => (
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
                {paginatedInvoices.map((invoice, index) => {
                  const statusColors = getInvoiceStatusChipColor(invoice.status);
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>{invoice.invoiceNum}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{invoice.client}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{invoice.amount}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
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

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Pagination
              count={totalInvoicePages}
              page={invoicePage}
              onChange={handleInvoicePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.primary.main,
                  },
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add New Transaction Dialog Form (Existing) */}
      <Dialog open={openAddTransactionDialog} onClose={handleCloseAddTransactionDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Add New Transaction
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              <DatePicker
                label="Date"
                value={newTransactionData.date}
                onChange={(date) => handleTransactionDateChange(date, 'date')}
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
              <TextField
                fullWidth
                label="Client"
                name="client"
                value={newTransactionData.client}
                onChange={handleTransactionFormChange}
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
                label="Amount (Birr)"
                name="amount"
                type="number"
                value={newTransactionData.amount}
                onChange={handleTransactionFormChange}
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
                  '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                }}
              />
              <DatePicker
                label="Due Date"
                value={newTransactionData.dueDate}
                onChange={(date) => handleTransactionDateChange(date, 'dueDate')}
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
          <Button onClick={handleCloseAddTransactionDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddTransactionSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Transaction
          </Button>
        </DialogActions>
      </Dialog>

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
      <Dialog open={openNewTripDialog} onClose={handleCloseNewTripDialog} fullWidth maxWidth="sm">
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
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Trip
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountingFinancePage;