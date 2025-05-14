// File: src/components/EmailPreview.jsx
import React from "react";
import { Paper, Typography, Button } from "@mui/material";

function EmailPreview({ email, onEdit }) {
  if (!email) return null;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">{email.subject}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {email.to} | {new Date(email.date).toLocaleString()}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
        {email.content}
      </Typography>
      <Button onClick={() => onEdit(email)} sx={{ mt: 2 }} variant="outlined">
        Edit
      </Button>
    </Paper>
  );
}

export default EmailPreview;
