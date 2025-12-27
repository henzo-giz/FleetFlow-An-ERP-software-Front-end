// src/components/FleetOverviewCard/FleetOverviewCard.jsx
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const FleetOverviewCard = ({ title, count, icon: IconComponent, color }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper, // Use paper background from theme
        borderRadius: theme.shape.borderRadius, // Consistent border radius
        boxShadow: theme.shadows[3], // Add a subtle shadow
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '120px', // Ensure consistent height for cards
        p: 2, // General padding for the card content
        color: theme.palette.text.primary, // Default text color
      }}
    >
      {/* Content for title, icon, and count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {IconComponent && (
          <IconComponent sx={{ fontSize: 32, color: color || theme.palette.primary.main }} />
        )}
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {count}
      </Typography>
    </Card>
  );
};

export default FleetOverviewCard;