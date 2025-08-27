import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Driver from "./pages/Driver";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <div style={{ marginLeft: "200px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/drivers" element={<Driver />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
