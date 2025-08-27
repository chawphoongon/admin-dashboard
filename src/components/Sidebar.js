// import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GGI_Logo from "../GGI_Logo.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
          backgroundColor: "#1976d2",
          color: "white"
        }
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          gap: "10px",
        }}
      >
        <img
          src={GGI_Logo}
          alt="GGI Logo"
          style={{ width: "35px", height: "35px", borderRadius: "6px" }}
        />
        <h2 style={{ margin: 0, fontSize: "20px" }}>Driver Webportal</h2>
      </div>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <PeopleIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>

      <ListItem button component={Link} to="/drivers">
        <ListItemIcon>
          <PeopleIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Drivers" />
      </ListItem>

    </Drawer>


  );
}
