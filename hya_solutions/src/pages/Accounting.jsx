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
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Date Pickers Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Icons for the page
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Icons for Financial Overview Metrics
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Icons for Quick Actions
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment'; // Changed from CreditCardIcon
import BarChartIcon from '@mui/icons-material/BarChart';

// Icons for Recent Invoices Actions
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Import your FinancialOverview chart component
import FinancialOverview from '../components/FinancialOverview';

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
  const [invoicePage, setInvoicePage] = useState(1);

  // --- State for Add Transaction Dialog (Existing) ---
  const [openAddTransactionDialog, setOpenAddTransactionDialog] = useState(false);
  const [newTransactionData, setNewTransactionData] = useState({
    date: null,
    client: '',
    amount: '',
    dueDate: null,
  });

  // --- New States for Quick Action Dialogs ---
  const [openCreateInvoiceDialog, setOpenCreateInvoiceDialog] = useState(false);
  const [createInvoiceData, setCreateInvoiceData] = useState({
    clientName: '',
    amount: '',
    dueDate: null,
  });

  const [openRecordPaymentDialog, setOpenRecordPaymentDialog] = useState(false);
  const [recordPaymentData, setRecordPaymentData] = useState({
    receiptNumber: '',
    amount: '',
    date: null,
    reason: '',
  });

  const [openPayrollManagementDialog, setOpenPayrollManagementDialog] = useState(false);
  const [payrollManagementData, setPayrollManagementData] = useState({
    employeeNumber: '',
    employeeName: '',
    amount: '',
    date: null,
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

  const handleDateChange = (date, name, setter) => {
    setter((prev) => ({
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
    // In a real application, you would send this data to your backend API
    handleCloseAddTransactionDialog();
  };

  // --- New Handlers for Create Invoice Dialog ---
  const handleOpenCreateInvoiceDialog = () => {
    setOpenCreateInvoiceDialog(true);
  };

  const handleCloseCreateInvoiceDialog = () => {
    setOpenCreateInvoiceDialog(false);
    setCreateInvoiceData({
      clientName: '',
      amount: '',
      dueDate: null,
    });
  };

  const handleCreateInvoiceFormChange = (event) => {
    const { name, value } = event.target;
    setCreateInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateInvoiceSubmit = () => {
    console.log('New Invoice to be created:', {
      ...createInvoiceData,
      dueDate: createInvoiceData.dueDate ? createInvoiceData.dueDate.format('YYYY-MM-DD') : '',
    });
    // Send data to backend
    handleCloseCreateInvoiceDialog();
  };

  // --- New Handlers for Record Payment Dialog ---
  const handleOpenRecordPaymentDialog = () => {
    setOpenRecordPaymentDialog(true);
  };

  const handleCloseRecordPaymentDialog = () => {
    setOpenRecordPaymentDialog(false);
    setRecordPaymentData({
      receiptNumber: '',
      amount: '',
      date: null,
      reason: '',
    });
  };

  const handleRecordPaymentFormChange = (event) => {
    const { name, value } = event.target;
    setRecordPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecordPaymentSubmit = () => {
    console.log('Payment to be recorded:', {
      ...recordPaymentData,
      date: recordPaymentData.date ? recordPaymentData.date.format('YYYY-MM-DD') : '',
    });
    // Send data to backend
    handleCloseRecordPaymentDialog();
  };

  // --- New Handlers for Payroll Management Dialog ---
  const handleOpenPayrollManagementDialog = () => {
    setOpenPayrollManagementDialog(true);
  };

  const handleClosePayrollManagementDialog = () => {
    setOpenPayrollManagementDialog(false);
    setPayrollManagementData({
      employeeNumber: '',
      employeeName: '',
      amount: '',
      date: null,
    });
  };

  const handlePayrollManagementFormChange = (event) => {
    const { name, value } = event.target;
    setPayrollManagementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayrollManagementSubmit = () => {
    console.log('Payroll to be managed:', {
      ...payrollManagementData,
      date: payrollManagementData.date ? payrollManagementData.date.format('YYYY-MM-DD') : '',
    });
    // Send data to backend
    handleClosePayrollManagementDialog();
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
    { label: 'Create Invoice', icon: ReceiptLongIcon, color: theme.palette.primary.main, handler: handleOpenCreateInvoiceDialog },
    { label: 'Record Payment', icon: PaymentIcon, color: theme.palette.success.main, handler: handleOpenRecordPaymentDialog }, // Using PaymentIcon
    { label: 'Payroll Management', icon: BarChartIcon, color: theme.palette.info.main, handler: handleOpenPayrollManagementDialog },
    { label: 'Financial Reports', icon: BarChartIcon, color: theme.palette.warning.main, handler: () => console.log('Open Financial Reports') },
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
  const invoicesPerPage = 3;
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
          mb: 3,
        }}
      >
        <Box>
          {/* <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Manage your fleet's financial operations
          </Typography> */}
        </Box>
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
                  width: '36vw',
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
                    onClick={action.handler}
                    sx={{
                      backgroundColor: action.color,
                      '&:hover': { bgcolor: action.color && `${action.color}d0` },
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
                onChange={(date) => handleDateChange(date, 'date', setNewTransactionData)}
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
                onChange={(date) => handleDateChange(date, 'dueDate', setNewTransactionData)}
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

      {/* Create Invoice Dialog Form */}
      <Dialog open={openCreateInvoiceDialog} onClose={handleCloseCreateInvoiceDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Create New Invoice
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Client Name"
                name="clientName"
                value={createInvoiceData.clientName}
                onChange={handleCreateInvoiceFormChange}
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
                value={createInvoiceData.amount}
                onChange={handleCreateInvoiceFormChange}
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
                value={createInvoiceData.dueDate}
                onChange={(date) => handleDateChange(date, 'dueDate', setCreateInvoiceData)}
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
          <Button onClick={handleCloseCreateInvoiceDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateInvoiceSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Create Invoice
          </Button>
        </DialogActions>
      </Dialog>

      {/* Record Payment Dialog Form */}
      <Dialog open={openRecordPaymentDialog} onClose={handleCloseRecordPaymentDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Record Payment
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Receipt Number"
                name="receiptNumber"
                value={recordPaymentData.receiptNumber}
                onChange={handleRecordPaymentFormChange}
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
                value={recordPaymentData.amount}
                onChange={handleRecordPaymentFormChange}
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
                label="Date"
                value={recordPaymentData.date}
                onChange={(date) => handleDateChange(date, 'date', setRecordPaymentData)}
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
                label="Reason"
                name="reason"
                value={recordPaymentData.reason}
                onChange={handleRecordPaymentFormChange}
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
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
          <Button onClick={handleCloseRecordPaymentDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleRecordPaymentSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.success.main,
              '&:hover': { backgroundColor: theme.palette.success.dark },
            }}
          >
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payroll Management Dialog Form */}
      <Dialog open={openPayrollManagementDialog} onClose={handleClosePayrollManagementDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Payroll Management
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Employee Number"
                name="employeeNumber"
                value={payrollManagementData.employeeNumber}
                onChange={handlePayrollManagementFormChange}
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
                label="Employee Name"
                name="employeeName"
                value={payrollManagementData.employeeName}
                onChange={handlePayrollManagementFormChange}
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
                value={payrollManagementData.amount}
                onChange={handlePayrollManagementFormChange}
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
                label="Date"
                value={payrollManagementData.date}
                onChange={(date) => handleDateChange(date, 'date', setPayrollManagementData)}
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
          <Button onClick={handleClosePayrollManagementDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handlePayrollManagementSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.info.main,
              '&:hover': { backgroundColor: theme.palette.info.dark },
            }}
          >
            Manage Payroll
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountingFinancePage;