// src/ThemeContext.jsx
import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 1. Create the Theme Context
// This context will provide the function to toggle the color mode.
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// 2. Define the getDesignTokens function for light and dark modes
// This function returns the theme palette configuration based on the selected mode.
const getDesignTokens = (mode) => ({
  palette: {
    mode, // 'light' or 'dark'
    ...(mode === 'light'
      ? {
          // Palette for light mode
          primary: {
            main: '#1976d2', // A standard blue for primary actions
          },
          secondary: {
            main: '#dc004e', // A standard pink for secondary actions
          },
          background: {
            default: '#f4f6f8', // Light background for the overall page
            paper: '#ffffff',    // White background for cards and raised surfaces
          },
          text: {
            primary: '#000000', // Black text for primary content
            secondary: '#555555', // Dark grey for secondary text (e.g., icons, labels)
          },
          action: {
            hover: 'rgba(0, 0, 0, 0.04)', // Light hover effect
            selected: 'rgba(25, 118, 210, 0.08)', // Light selected item effect for nav
          }
        }
      : {
          // Palette for dark mode (matching your design)
          primary: {
            main: '#90caf9', // A lighter blue for primary actions in dark mode
          },
          secondary: {
            main: '#f48fb1', // A lighter pink for secondary actions in dark mode
          },
          background: {
            default: '#2c363f', // Very dark background for the overall page
            paper: '#1d1e2f', // Dark blue-grey background for cards and surfaces
          },
          text: {
            primary: '#ffffff', // White text for primary content
            secondary: '#a0a0a0', // Light grey for secondary text (e.g., icons, labels)
          },
          action: {
            hover: 'rgba(255, 255, 255, 0.08)', // Dark hover effect
            selected: 'rgba(144, 202, 249, 0.08)', // Dark selected item effect for nav
          }
        }),
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Ensure this matches your global style
  },
  // You can add more theme properties here, like component overrides or spacing
});

// 3. Create the ThemeContextProvider Component
// This component manages the theme state and provides the theme to its children.
export function ThemeContextProvider({ children }) {
  // Use state to manage the current mode (light or dark), starting with 'dark'.
  const [mode, setMode] = useState('dark');

  // Memoize the toggle function to prevent unnecessary re-renders.
  // This function will be provided through the context.
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [], // Dependency array is empty as the function itself doesn't depend on state/props
  );

  // Memoize the theme object to prevent unnecessary re-creations.
  // The theme object is recreated only when the 'mode' changes.
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    // Provide the toggle function through the context
    <ColorModeContext.Provider value={colorMode}>
      {/* Apply the theme to all children */}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Injects global base styles for consistency */}
        {children} {/* Renders your entire application */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// 4. Custom hook for convenience
// This hook makes it easier for components to access the toggleColorMode function.
export const useColorMode = () => useContext(ColorModeContext);