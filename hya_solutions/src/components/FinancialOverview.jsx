// src/components/FinancialOverview.jsx

import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for Financial Overview (Monthly Revenue vs. Expenses)
const data = [
  { name: 'Jan', Revenue: 150000, Expenses: 100000 },
  { name: 'Feb', Revenue: 140000, Expenses: 95000 },
  { name: 'Mar', Revenue: 160000, Expenses: 110000 },
  { name: 'Apr', Revenue: 155000, Expenses: 105000 },
  { name: 'May', Revenue: 170000, Expenses: 115000 },
  { name: 'Jun', Revenue: 165000, Expenses: 110000 },
  { name: 'Jul', Revenue: 180000, Expenses: 120000 },
  { name: 'Aug', Revenue: 175000, Expenses: 118000 },
  { name: 'Sep', Revenue: 190000, Expenses: 125000 },
  { name: 'Oct', Revenue: 185000, Expenses: 122000 },
  { name: 'Nov', Revenue: 170000, Expenses: 115000 },
  { name: 'Dec', Revenue: 195000, Expenses: 130000 },
];

const FinancialOverview = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', width: '38vw', borderRadius: 5, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Financial Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Monthly Revenue vs. Expenses (GHS)
        </Typography>

        <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 350 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
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
                domain={['auto', 'auto']} // Ensures Y-axis scales correctly
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
              <Area type="monotone" dataKey="Revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} activeDot={{ r: 8 }} />
              <Area type="monotone" dataKey="Expenses" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} activeDot={{ r: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;