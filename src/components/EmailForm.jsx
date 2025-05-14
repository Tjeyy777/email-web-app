// File: src/components/EmailForm.jsx
import React, { useState, useEffect } from "react";
import { Button, Paper, TextField, Typography, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { validateEmail } from "../utils/validators";
import { v4 as uuidv4 } from "uuid";

function EmailForm({ addEmail, editEmail, updateEmail, clearEdit }) {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    content: "",
    tag: "Personal",
  });

  useEffect(() => {
    if (editEmail) setForm(editEmail);
  }, [editEmail]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(form.to)) return alert("Invalid email address");

    if (editEmail) {
      updateEmail({ ...form });
      clearEdit();
    } else {
      addEmail({ ...form, id: uuidv4(), date: new Date().toISOString() });
    }
    setForm({ to: "", subject: "", content: "", tag: "Personal" });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editEmail ? "Edit Email" : "Save Email"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="To"
          name="to"
          fullWidth
          margin="normal"
          value={form.to}
          onChange={handleChange}
        />
        <TextField
          label="Subject"
          name="subject"
          fullWidth
          margin="normal"
          value={form.subject}
          onChange={handleChange}
        />
        <TextField
          label="Tag"
          name="tag"
          select
          fullWidth
          margin="normal"
          value={form.tag}
          onChange={handleChange}
        >
          {["Personal", "Work", "Business"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Content"
          name="content"
          fullWidth
          margin="normal"
          multiline
          minRows={4}
          value={form.content}
          onChange={handleChange}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {editEmail ? "Update Email" : "Save Email"}
          </Button>
        </motion.div>
      </form>
    </Paper>
  );
}

export default EmailForm;
