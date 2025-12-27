// src/components/DashboardCard.jsx (or src/features/dashboard/components/DashboardCard.jsx)
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material'; // Removed Icon import as it's not used directly
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function DashboardCard({ title, value, percentageChange, icon: IconComponent }) {
  const isPositive = percentageChange && percentageChange.startsWith('+');
  const isNegative = percentageChange && percentageChange.startsWith('-');

  return (
    <Card sx={{ minWidth: 360, borderRadius: 5, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          {IconComponent && ( // This is where the icon component passed as prop is rendered
            <IconComponent sx={{ fontSize: 40, color: 'primary.main' }} />
          )}
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1.5, fontWeight: 'bold' }}>
          {value}
        </Typography>
        {percentageChange && (
          <Box display="flex" alignItems="center">
            {isPositive && <ArrowUpwardIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />}
            {isNegative && <ArrowDownwardIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />}
            <Typography variant="body2" color={isPositive ? 'success.main' : (isNegative ? 'error.main' : 'text.secondary')}>
              {percentageChange}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default DashboardCard;