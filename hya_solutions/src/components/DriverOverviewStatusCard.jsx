// src/components/DriverOverviewStatCard/DriverOverviewStatCard.jsx
import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
        color: theme.palette.text.primary,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {IconComponent && <IconComponent sx={{ fontSize: 28, color: color || theme.palette.primary.main }} />}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Card>
  );
};

export default DriverOverviewStatCard;