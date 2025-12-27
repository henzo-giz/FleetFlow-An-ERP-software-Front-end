// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = ({ onLoginSuccess }) => { // Accept onLoginSuccess prop
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // New state for error messages

  const handleLogin = (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    // --- Dummy Authentication Logic with Roles ---
    // In a real application, you would send email and password to your backend.
    // The backend would validate credentials and return the user's role.
    let userRole = null;

    if (email === 'admin@example.com' && password === 'password') {
      userRole = 'Admin';
    } else if (email === 'fleet@example.com' && password === 'password') {
      userRole = 'Fleet Manager';
    } else if (email === 'driver@example.com' && password === 'password') {
      userRole = 'Driver';
    } else if (email === 'mechanic@example.com' && password === 'password') {
      userRole = 'Mechanic';
    } else if (email === 'accountant@example.com' && password === 'password') {
      userRole = 'Accountant';
    } else {
      setError('Invalid email or password.');
      return;
    }

    if (userRole) {
      console.log(`Login successful for ${userRole}!`);
      onLoginSuccess(userRole); // Call the prop function, passing the user's role
      navigate('/'); // Redirect to the dashboard after successful login
    } else {
      setError('Login failed. Please check your credentials.'); // Should be caught by the above checks, but as a fallback
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 2,
          boxShadow: theme.shadows[5],
          p: 4,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h1" sx={{ color: theme.palette.text.primary, mb: 3, fontWeight: 'bold' }}>
            Fleet ERP Login
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
            Enter your credentials to access the dashboard.
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              size="medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.default,
                  borderRadius: theme.shape.borderRadius,
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
              InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              size="medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.default,
                  borderRadius: theme.shape.borderRadius,
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
              InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: theme.palette.primary.main,
                '&:hover': { backgroundColor: theme.palette.primary.dark },
                color: theme.palette.primary.contrastText,
                fontWeight: 'bold',
                py: 1.5,
                borderRadius: theme.shape.borderRadius,
              }}
            >
              Login
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Link
              href="#"
              variant="body2"
              sx={{
                color: theme.palette.primary.light,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Forgot Password?
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;