// src/components/DriverProfileCard.jsx
import React from 'react';
import { Box, Typography, Card, Avatar, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Generic avatar fallback

const DriverProfileCard = ({ name, status, license, expDate, safetyScore, avatarUrl }) => {
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return theme.palette.success.main;
      case 'On Trip': return theme.palette.info.main;
      case 'Available': return theme.palette.primary.main; // Using primary for Available based on design screenshot
      case 'Inactive': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

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
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Avatar
        src={avatarUrl || `https://placehold.co/128x128/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${name.charAt(0)}`}
        sx={{ width: 80, height: 80, mb: 1.5, border: `2px solid ${getStatusColor(status)}` }}
      >
        {!avatarUrl && <AccountCircleIcon sx={{ fontSize: 60 }} />}
      </Avatar>
      <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: getStatusColor(status), fontWeight: 'bold', mb: 1 }}>
        {status}
      </Typography>
      <Stack spacing={0.5} sx={{ width: '100%', mb: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          License: {license}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Exp: {expDate}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Safety Score: <span style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>{safetyScore}%</span>
        </Typography>
      </Stack>
    </Card>
  );
};

export default DriverProfileCard;