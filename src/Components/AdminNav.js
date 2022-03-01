import React from 'react'
import { useHistory } from 'react-router-dom';
import "../Styling/Login.css";

function AdminNav() {
    const history = useHistory();
    const handleClick = () => {
        history.push("/");
    };
  return (
    <div className="admin-nav">
        <nav>
            <h3>UpMenu</h3>
            <button className='login-btn' onClick={handleClick}>Logout</button>
        </nav>
    </div>
  )
}

export default AdminNav