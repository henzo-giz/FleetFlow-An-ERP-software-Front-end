FleetFlow: Advanced Fleet Management & Telematics Dashboard
FleetFlow is a robust, responsive React-based dashboard designed for logistics companies and fleet operators to monitor real-time vehicle status, driver performance, and operational costs. It provides a centralized view of fleet health, financial trends, and critical maintenance alerts.

🚀 Key Features
Real-Time Fleet Overview: Interactive donut charts visualizing vehicle status (Active, Idle, In Repair, Inspection).

Driver Performance Analytics: Safety score breakdowns using dynamic bar charts to identify top-performing operators.

Financial & Resource Tracking: Comprehensive line and area charts tracking monthly fuel consumption, costs, and revenue vs. expenses.

Operational Alerts System: Dedicated monitoring for:

Upcoming Maintenance schedules.

Low Inventory warnings for parts.

Fuel anomalies and alerts.

Overdue client payments.

Modern UI/UX: Built with Material-UI (MUI) for a clean, professional aesthetic with full mobile responsiveness.

Data Visualization: Powered by Recharts for smooth, interactive, and high-performance data rendering.

🛠️ Built With
React - Frontend framework.

Material-UI (MUI) - UI component library and theming.

Recharts - Composable charting library.

React-Lucide / MUI Icons - Vector icons.

📦 Installation
Clone the repository:

Bash

git clone https://github.com/your-username/fleet-management-dashboard.git
Install dependencies:

Bash

cd fleet-management-dashboard
npm install
Start the development server:

Bash

npm run dev
📊 Project Structure
/src/components - Reusable UI components including specialized chart wrappers.

/src/pages - Main dashboard layout and page structure.

/src/theme - Custom Material-UI theme configurations.

Progress Summary & Unresolved Challenges
For transparency and future development, here is the current status of the project:

Status: Core layout and data visualization components are integrated and responsive.

Completed: * Integration of ResponsiveContainers for all charts.

Standardization of Grid layout for 50/50 dashboard width allocation.

Custom legend and tooltip styling for consistent theming.

Current Focus: Refining component heights to achieve a compact "half-size" vertical footprint to maximize on-screen information density.

Unresolved Challenge: Perfecting the vertical scaling of SVG charts within high-density flexbox containers without losing aspect ratio clarity.
