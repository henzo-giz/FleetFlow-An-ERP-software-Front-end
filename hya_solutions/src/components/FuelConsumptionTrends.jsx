// src/components/FuelConsumptionTrends.jsx

import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for Fuel Consumption Trends
const data = [
  { name: 'Jan', 'Fuel Consumption (L)': 12000, 'Cost (GHS)': 5000 }, // Adjusted values to match screenshot scale
  { name: 'Feb', 'Fuel Consumption (L)': 11500, 'Cost (GHS)': 4800 },
  { name: 'Mar', 'Fuel Consumption (L)': 13000, 'Cost (GHS)': 6000 },
  { name: 'Apr', 'Fuel Consumption (L)': 12500, 'Cost (GHS)': 5500 },
  { name: 'May', 'Fuel Consumption (L)': 11000, 'Cost (GHS)': 4700 },
  { name: 'Jun', 'Fuel Consumption (L)': 10500, 'Cost (GHS)': 4500 },
  { name: 'Jul', 'Fuel Consumption (L)': 10800, 'Cost (GHS)': 4600 },
  { name: 'Aug', 'Fuel Consumption (L)': 11200, 'Cost (GHS)': 4900 },
  { name: 'Sep', 'Fuel Consumption (L)': 11800, 'Cost (GHS)': 5200 },
  { name: 'Oct', 'Fuel Consumption (L)': 12300, 'Cost (GHS)': 5400 },
  { name: 'Nov', 'Fuel Consumption (L)': 11700, 'Cost (GHS)': 5000 },
  { name: 'Dec', 'Fuel Consumption (L)': 12800, 'Cost (GHS)': 5800 },
];

const FuelConsumptionTrends = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', width: '38vw', borderRadius: 5, boxShadow: 3, p: 2, display: 'flex', flexDirection: 'column' }}> {/* Added flex properties */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Added flex properties */}
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Fuel Consumption Trends
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Monthly Overview (Litres & Cost)
        </Typography>

        {/* Removed explicit height and added flexGrow to allow responsiveness based on parent */}
        <Box sx={{ flexGrow: 1, width: '100%', minHeight: 250 }}> {/* Changed height to minHeight and added flexGrow */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="name"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={{ stroke: theme.palette.divider }}
              />
              <YAxis
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={{ stroke: theme.palette.divider }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                }}
                itemStyle={{ color: theme.palette.text.primary }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value, entry) => (
                  <span style={{ color: theme.palette.text.primary }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="Fuel Consumption (L)"
                stroke={theme.palette.warning.main} // Using Material-UI theme for colors
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Cost (GHS)"
                stroke={theme.palette.info.main} // Using Material-UI theme for colors
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FuelConsumptionTrends;