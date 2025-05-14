import React, { useState } from "react";
import {
  List,
  ListItem,
  Typography,
  IconButton,
  TextField,
  Paper,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

function EmailList({ emails, onSelect, onDelete, onEdit, darkMode }) {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalEmail, setModalEmail] = useState(null);
  console.log(modalEmail, "asdjvajsdkbakajbkjbkda");

  const filtered = emails.filter(
    (e) =>
      (e?.to?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (e?.subject?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Email List", 20, 20);

    let y = 30;
    filtered.forEach((email, index) => {
      doc.text(`Email ${index + 1}`, 20, y);
      doc.text(`To: ${email.to || "N/A"}`, 20, y + 10);
      doc.text(`Subject: ${email.subject || "N/A"}`, 20, y + 20);
      doc.text(
        `Date: ${email.date ? new Date(email.date).toLocaleString() : "N/A"}`,
        20,
        y + 30
      );
      y += 50;

      if (y > 250) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("email_list.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = filtered.map((email) => ({
      To: email.to || "N/A",
      Subject: email.subject || "N/A",
      Date: email.date ? new Date(email.date).toLocaleString() : "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emails");

    const colWidths = worksheetData.reduce((acc, row) => {
      Object.keys(row).forEach((key, i) => {
        const value = row[key] ? row[key].toString() : "";
        acc[i] = Math.max(acc[i] || 10, value.length);
      });
      return acc;
    }, {});

    worksheet["!cols"] = Object.keys(colWidths).map((i) => ({
      wch: colWidths[i],
    }));

    XLSX.writeFile(workbook, "email_list.xlsx");
  };

  const handleItemClick = (email) => {
    setModalEmail(email);
    setOpenModal(true);
    onSelect(email);
  };

  const handleClose = () => {
    setOpenModal(false);
    setModalEmail(null);
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
          <TextField
            label="Search by recipient or subject"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={exportToPDF}
              sx={{ whiteSpace: "nowrap" }}
            >
              PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={exportToExcel}
              sx={{ whiteSpace: "nowrap" }}
            >
              Excel
            </Button>
          </Box>
        </Box>

        {filtered.length === 0 ? (
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            No emails found.
          </Typography>
        ) : (
          <List>
            {filtered.map((email) => (
              <ListItem
                key={email.id}
                divider
                sx={{
                  "&:hover": {
                    backgroundColor: darkMode ? "#2c2c2c" : "#eaf1f3",
                  },
                }}
              >
                <Grid container alignItems="center">
                  <Grid
                    item
                    xs={10}
                    onClick={() => handleItemClick(email)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {email.subject || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {email.to || "N/A"} –{" "}
                      {email.date
                        ? new Date(email.date).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: "right" }}>
                    <IconButton onClick={() => onEdit(email)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(email.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Modal Dialog */}
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Email Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2">To:</Typography>
          <Typography variant="body1" gutterBottom>
            {modalEmail?.to || "N/A"}
          </Typography>

          <Typography variant="subtitle2">Subject:</Typography>
          <Typography variant="body1" gutterBottom>
            {modalEmail?.subject || "N/A"}
          </Typography>

          <Typography variant="subtitle2">Date:</Typography>
          <Typography variant="body1" gutterBottom>
            {modalEmail?.date
              ? new Date(modalEmail.date).toLocaleString()
              : "N/A"}
          </Typography>

          <Typography variant="subtitle2">Body:</Typography>
          <Typography variant="body1" gutterBottom>
            {modalEmail?.content || "N/A"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmailList;
