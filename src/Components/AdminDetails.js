import React from "react";
import { useHistory } from "react-router-dom";

function AdminDetails({ order, income }) {
  const history = useHistory();
  return (
    <div>
      <nav>
        <h3>UpMenu</h3>
        <button className="login-btn" onClick={() => history.push(`/admin`)}>
          Back
        </button>
      </nav>
      <h1>Admin Details</h1>
      <h1>Income: ₹{income}</h1>
      <h1>Orders Served: {order}</h1>
    </div>
  );
}

export default AdminDetails;
