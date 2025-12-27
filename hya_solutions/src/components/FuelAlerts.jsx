// src/components/FuelAlerts.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockFuelAlerts = [
  { type: 'FL-007 High Usage', percentage: '+25%' },
  { type: 'FL-019 Low Tank', percentage: '15%' },
  { type: 'FL-032 Efficiency', percentage: '+8%' },
];

const FuelAlerts = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 340, borderRadius: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Fuel Alerts
      </Typography>
      <List dense sx={{ '& .MuiListItem-root': { py: 0.5 } }}>
        {mockFuelAlerts.map((item, index) => (
          <React.Fragment key={item.type}>
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText
                primary={item.type}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: theme.palette.text.primary }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: item.percentage.startsWith('+') ? theme.palette.success.main : theme.palette.error.main, // Green for positive, red for negative
                  fontWeight: 'medium',
                }}
              >
                {item.percentage}
              </Typography>
            </ListItem>
            {index < mockFuelAlerts.length - 1 && (
              <Divider variant="inset" component="li" sx={{ ml: 0, my: 0.5, borderColor: theme.palette.divider }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default FuelAlerts;