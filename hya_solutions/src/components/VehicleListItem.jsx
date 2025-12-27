// src/components/VehicleListItem/VehicleListItem.jsx
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const VehicleListItem = ({ vehicleId, vehicleName, driver, location, status, lastUpdate }) => {
  const theme = useTheme();

  // Determine status color based on your design
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return theme.palette.success.main;
      case 'In Repair': return theme.palette.warning.main;
      case 'Idle': return theme.palette.info.main; // Or another neutral color like grey[500]
      case 'Under Inspection': return theme.palette.primary.main;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default, // Use default background for the item itself
        borderRadius: theme.shape.borderRadius,
        p: 2,
        mb: 2, // Margin bottom for spacing between items
        boxShadow: theme.shadows[1], // Subtle shadow for card-like appearance
        color: theme.palette.text.primary, // Default text color
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {vehicleId} - {vehicleName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: getStatusColor(status),
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {status}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
        Driver: {driver} | Location: {location}
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
        Last update: {lastUpdate}
      </Typography>
      <Divider sx={{ mt: 2, borderColor: theme.palette.divider }} />
    </Box>
  );
};

export default VehicleListItem;