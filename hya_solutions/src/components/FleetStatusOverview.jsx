// src/components/FleetStatusOverview.jsx

import React from 'react';
import { Card, CardContent, Typography, Box, Stack, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; // Removed 'Legend' from Recharts import as we're using a custom one

const data = [
  { name: 'Active', value: 700, color: '#4CAF50' }, // Green
  { name: 'In Repair', value: 200, color: '#F44336' }, // Red (changed to 200 for screenshot consistency)
  { name: 'Idle', value: 150, color: '#FFC107' },    // Amber
  { name: 'Inspection', value: 50, color: '#2196F3' }, // Blue
];

// No need for renderCustomizedLabel if you're not using external labels on the donut
// The central text and custom legend handle the labels as per your screenshot

const FleetStatusOverview = () => {
  const theme = useTheme(); // Access theme for consistent styling

  // Calculate total vehicles for the center text
  const totalVehicles = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card sx={{ height: '100%', width:'25vw', borderRadius: 5, boxShadow: 3, p: 2, display: 'flex', flexDirection: 'column' }}> {/* Added display:flex and flexDirection */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Added flexGrow to CardContent */}
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Fleet Status Overview
        </Typography>

        <Box sx={{ flexGrow: 1, position: 'relative', width: '100%', minHeight: 200 }}> {/* Changed fixed height to minHeight for responsiveness */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60} // Adjust for donut thickness
                outerRadius={90} // Adjust for donut thickness
                fill="#8884d8" // Default fill, overridden by Cell colors
                paddingAngle={5} // Space between segments
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Central text overlay for total vehicles */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none', // Allows interaction with chart beneath if needed
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              {totalVehicles}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Vehicles
            </Typography>
          </Box>
        </Box>

        {/* Custom Legend (This matches your screenshot's legend style) */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2, flexWrap: 'wrap' }}> {/* Added flexWrap */}
          {data.map((entry) => (
            <Box key={entry.name} display="flex" alignItems="center">
              <Box
                sx={{
                  width: 10, // Adjusted size based on screenshot
                  height: 10, // Adjusted size based on screenshot
                  borderRadius: '50%',
                  bgcolor: entry.color,
                  mr: 0.5, // Adjusted margin
                }}
              />
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}> {/* Changed to caption for smaller text */}
                {entry.name}
              </Typography>
            </Box>
          ))}
        </Stack>

      </CardContent>
    </Card>
  );
};

export default FleetStatusOverview;