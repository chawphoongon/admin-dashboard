// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { Button, TextField, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

// export default function UserTable() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "" });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => { loadUsers(); }, []);

//   const loadUsers = () => {
//     api.get("/users").then(res => setUsers(res.data));
//   };

//   const handleSubmit = () => {
//     if (editingId) {
//       api.put(`/users/${editingId}`, form).then(() => {
//         setEditingId(null);
//         setForm({ name: "", email: "" });
//         loadUsers();
//       });
//     } else {
//       api.post("/users", form).then(() => {
//         setForm({ name: "", email: "" });
//         loadUsers();
//       });
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingId(user.id);
//     setForm({ name: user.name, email: user.email });
//   };

//   const handleDelete = (id) => {
//     api.delete(`/users/${id}`).then(loadUsers);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Driver Management</h2>
//       <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//         <TextField label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//         <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//         <Button variant="contained" onClick={handleSubmit}>
//           {editingId ? "Update" : "Add"}
//         </Button>
//       </div>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map(u => (
//             <TableRow key={u.id}>
//               <TableCell>{u.id}</TableCell>
//               <TableCell>{u.name}</TableCell>
//               <TableCell>{u.email}</TableCell>
//               <TableCell>
//                 <Button onClick={() => handleEdit(u)}>Edit</Button>
//                 <Button color="error" onClick={() => handleDelete(u.id)}>Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// src/components/UserTable.js
import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance
import { Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Please fill in both Name and Email");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/users", form);
      }
      setForm({ name: "", email: "" });
      loadUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <h2>Driver Management</h2>

      {/* Form */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>

      {/* User Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleEdit(user)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

