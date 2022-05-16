import { FacebookOutlined, Instagram, LinkedIn } from "@mui/icons-material";
import React, { useEffect } from "react";
import "../Styling/AboutUs.css";

function AboutUs() {
  useEffect(() => {
    document.title = "UpMenu | About Us";
  }, []);
  return (
    <div className="main_about_us">
      <div className="about_us">
        <div className="section">
          <div className="container">
            <div className="content-section">
              <div className="content-title">
                <div className="title">
                  <h1>OUR PROJECT</h1>
                </div>
                <div className="content">
                  <h3>
                    The Canteen Token System is a web application which focuses on digitalizing the current scenario
                    of ordering food in the canteen. The customer will scan QR Code of the canteen and will be redirected
                    to the canteen’s website. The customer can add items to the cart and checkout. The order will be sent
                    to the canteen admin. After serving the customer, the admin can will remove the order. The website allows
                    the admin to add/remove items from the menu.
                  </h3>
                </div>
              </div>
              <div className="social">
                <a href="">
                  <i>
                    <FacebookOutlined />
                  </i>
                </a>
                <a href="">
                  <i>
                    <Instagram />
                  </i>
                </a>
                <a href="">
                  <i>
                    <LinkedIn />
                  </i>
                </a>
              </div>
            </div>
            {/* <div className="image">
            <img
              src="https://media.istockphoto.com/photos/female-colleagues-on-a-break-in-a-modern-office-picture-id1316091115?b=1&k=20&m=1316091115&s=170667a&w=0&h=WzPfOtRScgWwYaYWWl7OSWwbnSUijnd5Rc8kCoH00uo="
              alt=""
            />
          </div> */}
          </div>
        </div>
        {/* OUR MISSION*/}
        <div className="section">
          <div className="container">
            <div className="title">
              <h2>VISION</h2>
            </div>
            <div className="content">
              <h3>
                Our Vision is to reduce the hustle at the canteens during any kind
                of breaks and make the process of ordering food at the canteens
                and paying for it easier and more convenient.
              </h3>
            </div>
          </div>
        </div>

        {/* OUR TEAM*/}
        <div className="wrapper">
          <h1 className="heading">Meet Our Team</h1>
          <div className="profiles">
            <div className="profile">
              <img
                src={require("../Photos/Mrudul.jpeg")}
                className="profile-img"
                alt="c"
              />
              <div className="bio">
                <h3 className="user-name">Mrudul Patel</h3>
                <p>
                  SE Comp. Engg. student in JSPM NTC, Pune.
                  <br />
                  Skills: Java, C++, Python, Web Development
                </p>
              </div>
            </div>
            <div className="profile">
              <img
                src={require("../Photos/Atharva.jpeg")}
                className="profile-img"
                alt="c"
              />
              <div className="bio">
                <h3 className="user-name">Atharva Kurumbhatte</h3>
                <p>
                  Student at JSPM NTC, Comp Science. <br />
                  Skills: Web Development, Game Development, C++, Java
                </p>
              </div>
            </div>
            <div className="profile">
              <img
                src={require("../Photos/Mayur.jpeg")}
                className="profile-img"
                alt="c"
              />
              <div className="bio">
                <h3 className="user-name">Mayur Limbhore</h3>
                <p>
                  SE Comp. Engg. student in JSPM NTC, Pune
                  <br />
                  Skills: C, C++, Python, HTML and CSS
                </p>
              </div>
            </div>

            <div className="profile">
              <img src={require("../Photos/Mukund.jpg")} className="profile-img" alt="c" />
              <div className="bio">
                <h3 className="user-name">Mukund Chamriya</h3>
                <p>
                  SE Comp. Engg. student in JSPM NTC, Pune
                  <br />
                  Skills: UX designer, Network Marketing & Accounting
                </p>
              </div>
            </div>
            {/* <div className="profile">
            <img src={require("../Photos/Vinod.jpeg")} className="profile-img" alt="c" />
            <div className="bio">
              <h3 className="user-name">Vinod Choudhary</h3>
              <p>SE Comp. Engg. student in JSPM NTC, Pune</p>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
