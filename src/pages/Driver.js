import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from "@mui/material";

export default function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    policyvehicleid: "",
    firstname: "",
    lastname: "",
    idno: "",
    dateofbirth: "",
    licenseno: "",
    offence: "",
    authorized: false,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/drivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error loading drivers:", err);
    }
  };

  // Generic change handler for MUI TextFields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // convert authorized to boolean
    if (name === "authorized") {
      setForm({ ...form, authorized: type === "checkbox" ? checked : value === "true" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!form.firstname || !form.lastname || !form.licenseno) {
      alert("First Name, Last Name and License No are required");
      return;
    }

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`http://localhost:8080/api/drivers/${editingId}`, form);
        setEditingId(null);
      } else {
        // CREATE: do not send ID
        const { policyvehicleid, ...payload } = form;
        await axios.post("http://localhost:8080/api/drivers", payload);
      }
      resetForm();
      loadDrivers();
    } catch (err) {
      console.error("Error saving driver:", err);
    }
  };

  const handleEdit = (driver) => {
    setEditingId(driver.policyvehicleid);
    setForm({
      policyvehicleid: driver.policyvehicleid ?? "",
      firstname: driver.firstname ?? "",
      lastname: driver.lastname ?? "",
      idno: driver.idno ?? "",
      dateofbirth: driver.dateofbirth ?? "",
      licenseno: driver.licenseno ?? "",
      offence: driver.offence ?? "",
      authorized: !!driver.authorized,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/drivers/${id}`);
      loadDrivers();
      resetForm(); // clear state to avoid stale merges
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  const resetForm = () => {
    setForm({
      policyvehicleid: "",
      firstname: "",
      lastname: "",
      idno: "",
      dateofbirth: "",
      licenseno: "",
      offence: "",
      authorized: false,
    });
    setEditingId(null);
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <h2>Driver Management</h2>

      {/* Form (UI unchanged) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <TextField
          label="Policy Vehicle ID"
          name="policyvehicleid"
          value={form.policyvehicleid}
          onChange={handleChange}
          disabled // keep in UI but read-only so new posts don't send an id
        />
        <TextField
          label="First Name"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
        />
        <TextField
          label="ID No"
          name="idno"
          value={form.idno}
          onChange={handleChange}
        />
        <TextField
          type="date"
          label="DOB"
          name="dateofbirth"
          InputLabelProps={{ shrink: true }}
          value={form.dateofbirth}
          onChange={handleChange}
        />
        <TextField
          label="License No"
          name="licenseno"
          value={form.licenseno}
          onChange={handleChange}
        />
        <TextField
          label="Offence"
          name="offence"
          value={form.offence}
          onChange={handleChange}
        />
        <TextField
          label="Authorized (true/false)"
          name="authorized"
          value={form.authorized ? "true" : "false"}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>

      {/* Table (UI unchanged) */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Policy Vehicle ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>ID No</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>License No</TableCell>
              <TableCell>Offence</TableCell>
              <TableCell>Authorized</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.policyvehicleid}>
                <TableCell>{driver.policyvehicleid}</TableCell>
                <TableCell>{driver.firstname}</TableCell>
                <TableCell>{driver.lastname}</TableCell>
                <TableCell>{driver.idno}</TableCell>
                <TableCell>{driver.dateofbirth}</TableCell>
                <TableCell>{driver.licenseno}</TableCell>
                <TableCell>{driver.offence}</TableCell>
                <TableCell>{driver.authorized ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(driver)}>Edit</Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(driver.policyvehicleid)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
