<<<<<<< HEAD
import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import "../Styling/Login.css";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
function AdminNav() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
    auth.signOut();
  };
  return (
    <div className="admin-nav">
      <nav>
        <h3>UpMenu</h3>
        {/* <button className='login-btn' onClick={() => history.push("/details")}>View Details</button> */}
        <button className="settings-btn" onClick={() => history.push("/menu")}>
          <SettingsIcon />
        </button>
        <button className="logout-btn" onClick={handleClick}>
          <LogoutIcon />
          Logout
        </button>
=======
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import "../Styling/Login.css";

function AdminNav({ admin, adminName }) {
  

    const history = useHistory();
    const handleClick = () => {
      auth.signOut();
      history.push("/");
    };
  return (
    <div className="admin-nav">
        <nav>
            {/* <h3>UpMenu</h3> */}
            <h3>{adminName}</h3>
            {/* <button className='login-btn' onClick={() => history.push("/details")}>View Details</button> */}
            <button className='login-btn' onClick={() => history.push("/menu")}>Menu</button>
            <button className='login-btn' onClick={handleClick}>Logout</button>
>>>>>>> 9f72314a3b57416989793cdff0fdb44271141860
      </nav>
    </div>
  );
}

export default AdminNav;
