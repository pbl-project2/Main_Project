// import React from 'react'
// import "../Styling/Admin.css";

// function Admin({ handleDelete, user }) {
//   return (
//     <div className='adminuser'>
//         <h1>{user.token}</h1>
//         <h3>{user.name}</h3>
//         <p>{user.mobile}</p>
//         <button className='login-btn' onClick={() => handleDelete(user.id)}>Delete</button>
//     </div>
//   )
// }

// export default Admin
import React from "react";
import "../Styling/Admin.css";

function Admin({ user, handleDelete }) {
  return (
    <>
      <div className="container">
        <div className="adminuser">
          <h1>{user.token}</h1>
          <p>{user.name}</p>
          <p>{user.mobile}</p>
          <button className="delete-btn" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
