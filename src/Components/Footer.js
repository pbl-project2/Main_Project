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
            &copy; Copyrights Reserved {year}
            <span> UpMenu</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
