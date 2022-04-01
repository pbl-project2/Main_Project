import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useHistory } from "react-router-dom";

import "../Styling/QRCodeScanner.css";

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

  return (
      <div>
      {/* <h1>QR code scanner coming up</h1> */}
      {/* <button>Scan QRCODE</button> */}
      <a href={scan}>{scan}</a>
      <QrReader
      className="qr-reader"
        delay={300}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment"
        // ref={(node) => {
        //     this.node = node;
        // }}
        // delay={300}
        style={{ width: "100%" }}
        // onError={handleError}
        // onScan={handleScan}
        onResult={(result, error) => {
            if(!!result){
                setScan(result?.text);
                console.log(result?.text);
            }
            else{
                console.log(error);
            }
        }}
      />
      <p>Scanned: </p>
    </div>
  );
}

export default QRCodeScanner;
