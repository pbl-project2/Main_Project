import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import "../Styling/AdminMenu.css";
import Footer from "../Components/Footer";

function AdminMenuSeparate() {
  const history = useHistory();
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // db.collection("foodMenu").onSnapshot((snapshot) => {
    //   let foodArr = [];
    //   snapshot.forEach((doc) => {
    //     foodArr.push({ ...doc.data(), id: doc.id });
    //   });
    //   setFood(foodArr);
    //   // console.log(foodArr);
    // });
    db.collection("admin")
      .doc(`${email}`)
      .collection("foodMenu")
      .onSnapshot((snapshot) => {
        let foodArr = [];
        snapshot.forEach((doc) => {
          foodArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(foodArr);
        setLoading(true);
        // console.log(foodArr);
      });
  }, [db]);

  const handleDelete = async (id) => {
    // await db.collection("foodMenu").doc(`${id}`).delete();
    await db
      .collection("admin")
      .doc(`${email}`)
      .collection("foodMenu")
      .doc(`${id}`)
      .delete();
    toast.success("Food item deleted successfully");
  };

  const handleEdit = (food) => {
    sessionStorage.setItem("food", JSON.stringify(food));
    history.push(`/edit/${window.location.pathname.split("/")[2]}/${food.id}`);
  };

  var email = window.location.pathname.split("/")[2];

  return (
    <div className="main_admin">
      <div className="sep_admin_menu">
        <nav>
          <h3>UpMenu</h3>
          <div className="right">
            <button
              className="login-btn"
              onClick={() => history.push(`/admin-login/${email}`)}
            >
              Back
            </button>
            <button
              className="login-btn"
              onClick={() => history.push(`/food-new/${email}`)}
            >
              Add New Food Item
            </button>
          </div>
        </nav>
        <div className="adminmenu" style={{ marginTop: "100px" }}>
          {loading ? (
            <>
              <h2 style={{textAlign: "center"}}>YOUR MENU</h2>
              <h2>{" "}</h2>
              <h2>{" "}</h2>
              <table className="styled-table">
                <thead>
                  <tr style={{postition: "fixed"}}>
                    <th style={{ textAlign: "center" }}>No.</th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Price</th>
                    <th style={{ textAlign: "center" }}>Type</th>
                    <th style={{ textAlign: "center" }}>Description</th>
                    <th style={{ textAlign: "center" }}></th>
                    <th style={{ textAlign: "center" }}></th>
                  </tr>
                </thead>
                {food.length > 0 ? (
                  <tbody className={food.length > 5 ? "tbody" : "no-tbody"}>
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
                ) : (
                  <h3 style={{ textAlign: "center" }}>No Food Items</h3>
                )}
              </table>
            </>
          ) : (
            // ) : (
            //   <h3 style={{ textAlign: "center" }}>No Food Items</h3>
            // )
            <FadeLoader color={"#fff"} loading={loading} speedMultiplier={2} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMenuSeparate;
