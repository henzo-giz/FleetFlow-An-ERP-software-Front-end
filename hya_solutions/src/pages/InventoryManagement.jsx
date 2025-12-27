// src/pages/InventoryManagementPage/InventoryManagementPage.jsx
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
  Pagination,
  Stack, // For vertical spacing in some sections
  Dialog, // Added for the form dialog
  DialogTitle, // Added for the form dialog
  DialogContent, // Added for the form dialog
  DialogActions, // Added for the form dialog
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons for the page
import AddIcon from '@mui/icons-material/Add'; // Add Item button
import InventoryIcon from '@mui/icons-material/Inventory'; // Main page icon
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Low Stock Alerts
import SearchIcon from '@mui/icons-material/Search'; // Search input

// Icons for table actions
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Icons for Item Name in table (mock icons)
import BuildIcon from '@mui/icons-material/Build'; // Brake Pads (spare parts)
import OilBarrelIcon from '@mui/icons-material/OilBarrel'; // Engine Oil (consumables)
import HandymanIcon from '@mui/icons-material/Handyman'; // Torque Wrench (tools)
import AirIcon from '@mui/icons-material/Air'; // Air Filter (spare parts)


const InventoryManagementPage = () => {
  const theme = useTheme();
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockLevelFilter, setStockLevelFilter] = useState('All Stock Levels');
  const [page, setPage] = useState(1); // For pagination

  // State for the Add Item dialog
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
  // State for the new item form data
  const [newItemData, setNewItemData] = useState({
    itemName: '',
    category: '',
    currentStock: '',
    reorderPoint: '',
    supplier: '',
    unitPrice: '',
  });

  // Handler to open the Add Item dialog
  const handleOpenAddItemDialog = () => {
    setOpenAddItemDialog(true);
  };

  // Handler to close the Add Item dialog
  const handleCloseAddItemDialog = () => {
    setOpenAddItemDialog(false);
    // Optionally reset form fields when dialog closes
    setNewItemData({
      itemName: '',
      category: '',
      currentStock: '',
      reorderPoint: '',
      supplier: '',
      unitPrice: '',
    });
  };

  // Handler for form field changes
  const handleItemFormChange = (event) => {
    const { name, value } = event.target;
    setNewItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for submitting the new item form
  const handleAddItemSubmit = () => {
    console.log('New Item to be added:', newItemData);
    // Here you would typically send this data to your backend API
    // Example: axios.post('/api/inventory/items', newItemData)
    handleCloseAddItemDialog(); // Close dialog after submission
  };


  // Mock Data for Low Stock Alerts
  const lowStockAlerts = [
    { name: 'Brake Pads', unitsLeft: 5 },
    { name: 'Engine Oil Filter', unitsLeft: 3 },
    { name: 'Tire Pressure Gauge', unitsLeft: 2 },
  ];

  // Mock Data for Inventory Items Table
  const inventoryItems = [
    {
      icon: BuildIcon, // Example icon
      itemName: 'Brake Pads',
      category: 'Spare Parts',
      currentStock: 5,
      reorderPoint: 10,
      supplier: 'AutoParts Inc.',
      unitPrice: 450.00,
      status: 'Low Stock',
    },
    {
      icon: OilBarrelIcon, // Example icon
      itemName: 'Engine Oil (5L)',
      category: 'Consumables',
      currentStock: 25,
      reorderPoint: 15,
      supplier: 'FluidMax Ltd.',
      unitPrice: 2850.00,
      status: 'In Stock',
    },
    {
      icon: HandymanIcon, // Example icon
      itemName: 'Torque Wrench Set',
      category: 'Tools',
      currentStock: 8,
      reorderPoint: 5,
      supplier: 'ToolMaster Pro',
      unitPrice: 525.00,
      status: 'In Stock',
    },
    {
      icon: AirIcon, // Example icon
      itemName: 'Air Filter',
      category: 'Spare Parts',
      currentStock: 0,
      reorderPoint: 12,
      supplier: 'FilterPro Inc.',
      unitPrice: 255.75,
      status: 'Out of Stock',
    },
    {
      icon: BuildIcon,
      itemName: 'Spark Plugs',
      category: 'Spare Parts',
      currentStock: 15,
      reorderPoint: 20,
      supplier: 'Ignition Co.',
      unitPrice: 150.00,
      status: 'In Stock',
    },
    {
      icon: OilBarrelIcon,
      itemName: 'Brake Fluid (1L)',
      category: 'Consumables',
      currentStock: 7,
      reorderPoint: 10,
      supplier: 'FluidMax Ltd.',
      unitPrice: 180.00,
      status: 'Low Stock',
    },
  ];

  // Pagination logic (mocking total items and items per page)
  const itemsPerPage = 4;
  const totalItems = inventoryItems.length; // In a real app, this would come from API
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedItems = inventoryItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'Low Stock': return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText };
      case 'In Stock': return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText };
      case 'Out of Stock': return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText };
      default: return { bgcolor: theme.palette.grey[500], color: theme.palette.common.white };
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
          mb: 3,
        }}
      >
        <Box>
          {/* <Typography variant="h4" component="h1" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            Inventory Management
          </Typography> */}
          {/* <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Manage spare parts, tools, and consumables
          </Typography> */}
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddItemDialog} // <--- Added onClick handler
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Add Item
        </Button>
      </Box>

      {/* Low Stock Alerts */}
      <Card sx={{ bgcolor: theme.palette.error.dark, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2, mb: 4 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
          <WarningAmberIcon sx={{ fontSize: 32, color: theme.palette.common.white, mr: 1 }} />
          <Typography variant="h6" sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>
            Low Stock Alerts
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, ml: { xs: 0, sm: 2 } }}> {/* Responsive margin for alerts */}
            {lowStockAlerts.map((alert, index) => (
              <Typography key={index} variant="body1" sx={{ color: theme.palette.common.white }}>
                {alert.name} <span style={{ fontWeight: 'bold' }}>{alert.unitsLeft} units left</span>
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Inventory Items Table */}
      <Card sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[3], p: 2 }}>
        <CardContent>
          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search inventory items..."
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
              }}
              sx={{
                flexGrow: 1,
                minWidth: '200px', // Ensure it doesn't get too small
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
              <InputLabel sx={{ color: theme.palette.text.secondary }}>All Categories</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="All Categories"
                sx={{
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value="All Categories">All Categories</MenuItem>
                <MenuItem value="Spare Parts">Spare Parts</MenuItem>
                <MenuItem value="Consumables">Consumables</MenuItem>
                <MenuItem value="Tools">Tools</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: theme.palette.text.secondary }}>All Stock Levels</InputLabel>
              <Select
                value={stockLevelFilter}
                onChange={(e) => setStockLevelFilter(e.target.value)}
                label="All Stock Levels"
                sx={{
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                  '& .MuiSvgIcon-root': { color: theme.palette.text.secondary },
                }}
                MenuProps={{ PaperProps: { sx: { bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3] } } }}
              >
                <MenuItem value="All Stock Levels">All Stock Levels</MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Item Name', 'Category', 'Current Stock', 'Reorder Point', 'Supplier', 'Unit Price(Birr)', 'Status', 'Actions'].map((head) => (
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
                {paginatedItems.map((item, index) => {
                  const statusColors = getStatusChipColor(item.status);
                  const IconComponent = item.icon; // Get the icon component from mock data
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ color: theme.palette.text.primary, display: 'flex', alignItems: 'center', gap: 1 }}>
                        {IconComponent && <IconComponent sx={{ fontSize: 20, color: theme.palette.text.secondary }} />}
                        {item.itemName}
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{item.category}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{item.currentStock}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{item.reorderPoint}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{item.supplier}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
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
                          <IconButton size="small" sx={{ color: theme.palette.error.main }}><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: { xs: 1, sm: 0 } }}>
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, totalItems)} of {totalItems} results
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
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

      {/* Add New Item Dialog Form */}
      <Dialog open={openAddItemDialog} onClose={handleCloseAddItemDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Add New Inventory Item
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <Stack spacing={2}>
            {/* Item Name */}
            <TextField
              fullWidth
              label="Item Name"
              name="itemName"
              value={newItemData.itemName}
              onChange={handleItemFormChange}
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

            {/* Category */}
            <FormControl fullWidth margin="dense">
              <InputLabel sx={{ color: theme.palette.text.secondary }}>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={newItemData.category}
                onChange={handleItemFormChange}
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
                <MenuItem value=""><em>Select Category</em></MenuItem>
                <MenuItem value="Spare Parts">Spare Parts</MenuItem>
                <MenuItem value="Consumables">Consumables</MenuItem>
                <MenuItem value="Tools">Tools</MenuItem>
              </Select>
            </FormControl>

            {/* Current Stock */}
            <TextField
              fullWidth
              label="Current Stock"
              name="currentStock"
              type="number"
              value={newItemData.currentStock}
              onChange={handleItemFormChange}
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

            {/* Reorder Point */}
            <TextField
              fullWidth
              label="Reorder Point"
              name="reorderPoint"
              type="number"
              value={newItemData.reorderPoint}
              onChange={handleItemFormChange}
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

            {/* Supplier */}
            <TextField
              fullWidth
              label="Supplier"
              name="supplier"
              value={newItemData.supplier}
              onChange={handleItemFormChange}
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

            {/* Unit Price */}
            <TextField
              fullWidth
              label="Unit Price (Birr)"
              name="unitPrice"
              type="number"
              value={newItemData.unitPrice}
              onChange={handleItemFormChange}
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
          </Stack>
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
          <Button onClick={handleCloseAddItemDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddItemSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagementPage;