import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import "../Styling/Login.css";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { QrCode2 } from "@mui/icons-material";

function AdminNav({ adminEmail, user }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
    auth.signOut();
  };
  const [search, setSearch] = useState("");
  const [food, setFood] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(`${user.id}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let foodArr = [];
        snapshot.forEach((doc) => {
          foodArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(foodArr);
      });
  }, [db]);
  return (
    <div className="admin-nav">
      <nav className="admin-nav-whole">
        <h3>UpMenu</h3>
        {/* <button className='login-btn' onClick={() => history.push("/details")}>View Details</button> */}
        <div className="admin-nav-right">
          
          <button
            className="settings-btn"
            onClick={() => history.push(`/admin-menu/${adminEmail}`)}
          >
            <SettingsIcon />
          </button>
          <button style={{ border: "none" }} className="qr-code-download">
            <a
              href={global.localStorage.getItem("src")}
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
