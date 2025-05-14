
// File: src/components/ThemeToggle.jsx
import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
      label="Dark Mode"
      sx={{ mb: 2 }}
    />
  );
}

export default ThemeToggle;