// src/components/LowInventory.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockInventoryData = [
  { item: 'Brake Pads', quantity: '5 left' },
  { item: 'Engine Oil', quantity: '12 left' },
  { item: 'Tires', quantity: '3 left' },
];

const LowInventory = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 340, borderRadius: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Low Inventory
      </Typography>
      <List dense sx={{ '& .MuiListItem-root': { py: 0.5 } }}>
        {mockInventoryData.map((item, index) => (
          <React.Fragment key={item.item}>
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText
                primary={item.item}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: theme.palette.text.primary }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.warning.main, fontWeight: 'medium' }}>
                {item.quantity}
              </Typography>
            </ListItem>
            {index < mockInventoryData.length - 1 && (
              <Divider variant="inset" component="li" sx={{ ml: 0, my: 0.5, borderColor: theme.palette.divider }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default LowInventory;