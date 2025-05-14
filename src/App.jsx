import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  CssBaseline,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EmailForm from "./components/EmailForm";
import EmailList from "./components/EmailList";
import StatsPieChart from "./components/StatsPieChart";
import StatsBarChart from "./components/StatsBarChart";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [emails, setEmails] = useState(() => {
    const saved = localStorage.getItem("emails");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [editEmail, setEditEmail] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("emails", JSON.stringify(emails));
  }, [emails]);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Side-by-side layout */}
        <Grid container spacing={2}>
          {/* Left - Email Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: "100%" }}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <EmailForm
                  addEmail={(email) => setEmails([...emails, email])}
                  editEmail={editEmail}
                  updateEmail={(updated) =>
                    setEmails(
                      emails.map((e) => (e.id === updated.id ? updated : e))
                    )
                  }
                  clearEdit={() => setEditEmail(null)}
                />
              </Paper>
            </Box>
          </Grid>

          {/* Right - Email List */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: "100%" }}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <EmailList
                  emails={emails}
                  onSelect={setSelectedEmail}
                  onDelete={(id) =>
                    setEmails(emails.filter((e) => e.id !== id))
                  }
                  onEdit={setEditEmail}
                  darkMode={darkMode}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
        {/* Full Width Stats */}
        <Grid>
          <Paper elevation={6} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Email Stats
            </Typography>
            <Box
              sx={{
                // flex: 1,
                // minWidth: 150,
                // mr: 4,
                display: "flex",
                // justifyContent: "center",
              }}
            >
              {/* <Box sx={{ flex: 1, minWidth: 150, mr: 4 }} md={9}>  */}
              <StatsPieChart emails={emails} />
              {/* </Box> */}
              <Box sx={{ flex: 1, minWidth: 250 }} md={3}>
                <StatsBarChart emails={emails} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
