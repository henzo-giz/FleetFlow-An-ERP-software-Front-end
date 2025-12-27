// src/components/QuickReportCard/QuickReportCard.jsx
import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const QuickReportCard = ({ title, description, icon: IconComponent, color }) => {
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        color: theme.palette.text.primary,
        borderBottom: `4px solid ${color || theme.palette.primary.main}`,
      }}
    >
      <IconComponent sx={{ fontSize: 40, color: color || theme.palette.primary.main, mb: 1.5 }} />
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
        {description}
      </Typography>
    </Card>
  );
};

export default QuickReportCard;