import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useHistory } from "react-router-dom";
import "../Styling/QRCodeScanner.css";
import Snackbar from "@mui/material/Snackbar";
import Footer from "./Footer";

function QRCodeScanner() {
  const [scan, setScan] = useState("");
  const history = useHistory();
  const handleError = (err) => {
    console.error(err);
  };
  const handleScan = (data) => {
    if (data) {
      setScan(data);
    }
  };
  useEffect(() => {
    document.title = "UpMenu | Scan QR Code";
  }, []);
  return (
    <div className="qrcode_main">
      <nav>
        <h3>UpMenu</h3>
        <button className="login-btn" onClick={() => history.push("/")}>
          Back
        </button>
      </nav>
      <div className="qr-code-scanner">
        {/* <a href={scan}>{scan}</a> */}
        {/* <QrReader
        className="qr-reader"
        delay={300}
        onError={handleError}
        onScan={handleScan}
        // ref={(node) => {
        //     this.node = node;
        // }}
        // delay={300}
        style={{ width: "100%" }}
        // onError={handleError}
        // onScan={handleScan}
        onResult={(result, error) => {
          if (!!result) {
            setScan(result?.text);
            console.log(result?.text);
          } else {
            console.log(error);
          }
        }}
        /> */}
        <div className="qrcode">
          <div className="row11">
            <BarcodeScannerComponent
              height={76}
              width={76}
              onUpdate={(err, res) => {
                if (res) {
                  let result = res.toString();
                  // setScan(res.text);
                  if (
                    result.includes("upmenu") ||
                    result.includes("canteen-token-system")
                  ) {
                    window.location.href = res.text;
                    setScan("");
                  } else {
                    setScan("Invalid QR Code");
                  }
                } else console.log(err);
              }}
              facingMode="environment"
              style={{ width: "100%" }}
            />
          </div>
          <h3>SCAN QR CODE</h3>
          <h3>{scan}</h3>
        </div>
        {/* <h3>Scan Qr Code</h3> */}
      </div>
      <Footer />
    </div>
  );
}

export default QRCodeScanner;
