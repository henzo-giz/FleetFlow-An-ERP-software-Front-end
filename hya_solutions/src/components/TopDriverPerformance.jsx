// src/components/TopDriverPerformance.jsx

import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for Top Driver Performance
const data = [
  { name: 'Kidus Yared', 'Safety Score': 4.5 }, // Adjusted to match Y-axis scale in screenshot (0-5)
  { name: 'Hana Yesigat', 'Safety Score': 3.8 },
  { name: 'Liyu Nakachew', 'Safety Score': 2.7 }, // Adjusted value for visual variety
  { name: 'Yonas Asmamaw', 'Safety Score': 4.1 },
  { name: 'Poppy Tadesse', 'Safety Score': 3.2 },
];

const TopDriverPerformance = () => {
  const theme = useTheme(); // Access theme for consistent styling

  return (
    <Card sx={{ height: '100%', width:'50vw', borderRadius: 5, boxShadow: 3, p: 2, display: 'flex', flexDirection: 'column' }}> {/* Added flex properties */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Added flex properties */}
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Top Driver Performance
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Safety Score Breakdown
        </Typography>

        {/* Removed fixed height from this Box, let ResponsiveContainer manage it */}
        <Box sx={{ flexGrow: 1, width: '100%', minHeight: 250 }}> {/* Ensure it can grow and has a minHeight */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                domain={[0, 5]} // Explicitly set domain if scores are 0-5 scale
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
              {/* Using theme.palette.primary.main for bar color based on screenshot */}
              <Bar dataKey="Safety Score" fill={theme.palette.primary.main} barSize={30} /> {/* Increased barSize slightly */}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopDriverPerformance;