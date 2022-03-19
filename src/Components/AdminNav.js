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
      </nav>
    </div>
  );
}

export default AdminNav;
