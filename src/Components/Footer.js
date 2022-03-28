import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LinkedIn } from "@mui/icons-material";
import "../Styling/Footer.css";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer>
      <div className="main">
        <hr style={{height: "2px", color: "#99A9C1" }} />
        <div className="footer-content">
          <ul className="socials">
            <li>
              <i>
                <FacebookIcon />
              </i>
            </li>
            <li>
              <i>
                <LinkedIn />
              </i>
            </li>
            <li>
              <i>
                <InstagramIcon />
              </i>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; Copyrights Reserved {year} - {year + 1}
            <span> UpMenu</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
