// src/components/MaintenanceDue.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockMaintenanceData = [
  { id: 'VCL-001', type: 'Oil Change', daysLeft: '2 days' },
  { id: 'VCL-023', type: 'Tire Rotation', daysLeft: '5 days' },
  { id: 'VCL-045', type: 'Brake Inspection', daysLeft: '7 days' },
];

const MaintenanceDue = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 340, borderRadius: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Maintenance Due
      </Typography>
      <List dense sx={{ '& .MuiListItem-root': { py: 0.5 } }}> {/* Adjust padding */}
        {mockMaintenanceData.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText
                primary={`Vehicle ${item.id}`}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: theme.palette.text.primary }}
                secondaryTypographyProps={{ variant: 'caption', color: theme.palette.text.secondary }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.warning.main, fontWeight: 'medium' }}> {/* Orange for 'due' */}
                {item.daysLeft}
              </Typography>
            </ListItem>
            {index < mockMaintenanceData.length - 1 && (
              <Divider variant="inset" component="li" sx={{ ml: 0, my: 0.5, borderColor: theme.palette.divider }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default MaintenanceDue;