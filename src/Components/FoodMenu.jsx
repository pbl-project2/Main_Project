import React, { useEffect, useState } from "react";
import "../Styling/FoodMenu.css";
import FoodCard from "./FoodCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cart from "./Cart";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import Footer from "./Footer";
import { Badge, Tooltip } from "@mui/material";
import FadeLoader from "react-spinners/FadeLoader";

const FoodMenu = ({ props }) => {
  const history = useHistory();
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  var email = window.location.pathname.split("/")[2];

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

  useEffect(() => {
    db.collection("users")
      .doc(`${sessionStorage.getItem("userId")}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let cartCount = 0;
        snapshot.forEach((doc) => {
          cartCount++;
        });
        setCartCount(cartCount);
      });
  }, [db]);

  const handleSnacks = () => {
    // db.collection("foodMenu")
    //   .where("type", "==", "Snacks")
    //   .get()
    //   .then((snapshot) => {
    //     let snacksArr = [];
    //     snapshot.forEach((doc) => {
    //       snacksArr.push({ ...doc.data(), id: doc.id });
    //     });
    //     setFood(snacksArr);
    //     // console.log(snacksArr);
    //   });
    db.collection("admin")
      .doc(`${email}`)
      .collection("foodMenu")
      .where("type", "==", "Snacks")
      .get()
      .then((snapshot) => {
        let snacksArr = [];
        snapshot.forEach((doc) => {
          snacksArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(snacksArr);
        // console.log(snacksArr);
      });
  };

  const handleLunch = async () => {
    // db.collection("foodMenu")
    //   .where("type", "==", "Lunch")
    //   .get()
    //   .then((snapshot) => {
    //     let snacksArr = [];
    //     snapshot.forEach((doc) => {
    //       snacksArr.push({ ...doc.data(), id: doc.id });
    //     });
    //     setFood(snacksArr);
    //     // console.log(snacksArr);
    //   });
    db.collection("admin")
      .doc(`${email}`)
      .collection("foodMenu")
      .where("type", "==", "Lunch")
      .get()
      .then((snapshot) => {
        let snacksArr = [];
        snapshot.forEach((doc) => {
          snacksArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(snacksArr);
        // console.log(snacksArr);
      });
  };

  const handleBeverages = async () => {
    // db.collection("foodMenu")
    //   .where("type", "==", "Beverages")
    //   .get()
    //   .then((snapshot) => {
    //     let snacksArr = [];
    //     snapshot.forEach((doc) => {
    //       snacksArr.push({ ...doc.data(), id: doc.id });
    //     });
    //     setFood(snacksArr);
    //     // console.log(snacksArr);
    //   });
    db.collection("admin")
      .doc(`${email}`)
      .collection("foodMenu")
      .where("type", "==", "Beverages")
      .get()
      .then((snapshot) => {
        let snacksArr = [];
        snapshot.forEach((doc) => {
          snacksArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(snacksArr);
      });
  };

  const handleShowAll = async () => {
    db.collection("admin")
      .doc(`${email}`)
      .collection("foodMenu")
      .get()
      .then((snapshot) => {
        let snacksArr = [];
        snapshot.forEach((doc) => {
          snacksArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(snacksArr);
      });
  };

  var searchWord = search.charAt(0).toUpperCase() + search.slice(1);

  return (
    <div className="food_menu_main">
      <div className="food-menu">
        <div className="nav">
          <h3>UpMenu</h3>
          <div>
            <input
              type="text"
              placeholder="Search food here..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Tooltip title="Cart">
              <Badge badgeContent={cartCount} color="info" className="Cart-link">
                <Link to={`/cart/${window.location.pathname.split("/")[2]}/${window.location.pathname.split("/")[3]
                  }`}>
                  <AddShoppingCartIcon />
                </Link>
              </Badge>
            </Tooltip>
            <button onClick={() => history.replace("/")} className="home-btn">
              Home Page
            </button>
          </div>
        </div>
        <div className="title">
          <h3 className="main-title">Food Menu</h3>
        </div>
        <hr />
        <div className="food_list">
          <div className="food-cards">
            <div className="all-bout-food">
              <div className="categories">
                {/* <a href="#" className="category" onClick={handleSnacks}>
            Breakfast
          </a>
          <a href="#" className="category" onClick={handleLunch}>
            Lunch
          </a>
          <a href="#" className="category" onClick={handleBeverages}>
            Beverages
          </a> */}
                {/* {search !== "" ? (
              <a href="#" className="category" onClick={handleShowAll}>
                All
              </a>
            ) : null} */}
                <a href="#" className="category" onClick={handleShowAll}>
                  All
                </a>
                <a href="#" className="category" onClick={handleSnacks}>
                  Breakfast
                </a>
                <a href="#" className="category" onClick={handleLunch}>
                  Lunch
                </a>
                <a href="#" className="category" onClick={handleBeverages}>
                  Beverages
                </a>
              </div>
              <div className="food-card-list">
                {loading ? (
                  search !== "" ? (
                    <>
                      {food
                        .filter((item) => item.name.includes(searchWord))
                        .map((item) => (
                          <FoodCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            price={item.price}
                            description={item.description}
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      {food.map((item) => (
                        <FoodCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          type={item.type}
                          price={item.price}
                          description={item.description}
                        />
                      ))}
                    </>
                  )
                ) : (
                  <div className="loader1">
                    <FadeLoader size={15} color="#fff" />
                  </div>
                  /* <div className="loading">
              <Cached />
            </div> */
                  /* <div className="loading"> */
                  /* </div> */
                )}
              </div>
              {/* <a href="#" className="category" onClick={handleSnacks}>
            Breakfast
          </a>
          <a href="#" className="category" onClick={handleLunch}>
            Lunch
          </a>
          <a href="#" className="category" onClick={handleBeverages}>
            Beverages
          </a> */}
            </div>

            <Cart />
          </div>
        </div>
        <Footer />
      </div >
    </div >
  );
};

export default FoodMenu;
