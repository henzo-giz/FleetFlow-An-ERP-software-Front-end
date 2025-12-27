// src/components/OverduePayments.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockOverduePayments = [
  { company: 'ABC Corp', amount: '$12,500' },
  { company: 'XYZ Ltd', amount: '$8,900' },
  { company: 'DEF Inc', amount: '$16,760' },
];

const OverduePayments = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 340, borderRadius: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Overdue Payments
      </Typography>
      <List dense sx={{ '& .MuiListItem-root': { py: 0.5 } }}>
        {mockOverduePayments.map((item, index) => (
          <React.Fragment key={item.company}>
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText
                primary={item.company}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: theme.palette.text.primary }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.error.main, fontWeight: 'medium' }}> {/* Red for overdue */}
                {item.amount}
              </Typography>
            </ListItem>
            {index < mockOverduePayments.length - 1 && (
              <Divider variant="inset" component="li" sx={{ ml: 0, my: 0.5, borderColor: theme.palette.divider }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default OverduePayments;