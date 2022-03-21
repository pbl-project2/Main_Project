import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import "../Styling/Login.css";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { QrCode2 } from "@mui/icons-material";

function AdminNav({ adminEmail }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
    auth.signOut();
  };
  return (
    <div className="admin-nav">
      <nav className="admin-nav-whole">
        <h3>UpMenu</h3>
        {/* <button className='login-btn' onClick={() => history.push("/details")}>View Details</button> */}
        <div className="admin-nav-right">
          <button
            className="settings-btn"
            onClick={() => history.push(`/separate-menu/${adminEmail}`)}
          >
            <SettingsIcon />
          </button>
          <button style={{ border: "none" }} className="qr-code-download">
            <a
              href={localStorage.getItem("src")}
              download
              style={{ textDecoration: "none" }}
            >
              <QrCode2 />
            </a>
          </button>
          <button className="logout-btn" onClick={handleClick}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
