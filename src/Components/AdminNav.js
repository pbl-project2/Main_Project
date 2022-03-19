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
      </nav>
      
      
    </div>
  )
}

export default AdminNav;