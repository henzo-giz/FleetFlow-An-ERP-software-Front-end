// src/pages/Dashboard.jsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import DashboardCard from '../components/DashboardCard';
import FleetStatusOverview from '../components/FleetStatusOverview';
import TopDriverPerformance from '../components/TopDriverPerformance';
import FuelConsumptionTrends from '../components/FuelConsumptionTrends';
import FinancialOverview from '../components/FinancialOverview';
import MaintenanceDue from '../components/MaintenanceDue';
import LowInventory from '../components/LowInventory';
import FuelAlerts from '../components/FuelAlerts';
import OverduePayments from '../components/OverduePayments';

const DashboardPage = () => {
  const mockCardData = [
    { title: "Total Drivers", value: "247", percentageChange: "+12%", icon: "GroupIcon" },
    { title: "Total Vehicles", value: "156", percentageChange: "-3%", icon: "DriveEtaIcon" },
    { title: "Active Clients", value: "89", percentageChange: "+8%", icon: "PeopleIcon" },
    { title: "Monthly Revenue", value: "$284K", percentageChange: "+15%", icon: "AccountBalanceWalletIcon" },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2, pt:0, mt: 0 }}>

      {/* Top Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 1 }}>
        {mockCardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...data} />
          </Grid>
        ))}
      </Grid>

      {/* --- Charts Row 1 --- */}
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12} md={6}>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 5 }}>
            <FleetStatusOverview />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <TopDriverPerformance />
          </Grid>
        </Grid>
      </Grid>

      {/* --- Charts Row 2 --- */}
      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid item xs={12} md={6}>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <FuelConsumptionTrends />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <FinancialOverview />
          </Grid>
        </Grid>
      </Grid>

      {/* --- Info Cards Row --- */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <MaintenanceDue />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <LowInventory />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <FuelAlerts />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <OverduePayments />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;