import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import "../Styling/AdminMenu.css";

function AdminMenu() {
  const history = useHistory();
  const [food, setFood] = useState([]);
  useEffect(() => {
    db.collection("foodMenu").onSnapshot((snapshot) => {
      let foodArr = [];
      snapshot.forEach((doc) => {
        foodArr.push({ ...doc.data(), id: doc.id });
      });
      setFood(foodArr);
      // console.log(foodArr);
    });
  }, [db]);

  const handleDelete = async (id) => {
    await db.collection("foodMenu").doc(`${id}`).delete();
  };

  const handleEdit = (food) => {
    sessionStorage.setItem("food", JSON.stringify(food));
    history.push(`/edit/${food.id}`);
  };

  var email = window.location.pathname.split("/")[2];

  return (
    <div>
      <nav>
        <h3>UpMenu</h3>
        <button className="login-btn" onClick={() => history.push("/admin-login")}>
          Back
        </button>
        <button className="login-btn" onClick={() => history.push(`/new/${email}`)}>
          Add New Food Item
        </button>
      </nav>
      <div className="adminmenu" style={{ marginTop: "100px" }}>
        {food.length > 0 ? (
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Type</th>
                <th style={{ textAlign: "center" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {food.map((food, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>₹{food.price}</td>
                  <td className="td-desc">{food.type}</td>
                  <td className="td-desc">{food.description}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(food.name)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(food)}
                      className="btn btn-delete"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 style={{ textAlign: "center" }}>No Food Items</h3>
        )}
      </div>
    </div>
  );
}

export default AdminMenu;
