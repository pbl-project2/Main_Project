import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useHistory } from "react-router-dom";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";

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

  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    // console.log(`Code matched = ${decodedText}`, decodedResult);
    if(decodedResult){
        setScan(decodedResult);
    }
  }

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  return (
    <div>
      <div id="reader" width="600px"></div>
      {/* <h1>QR code scanner coming up</h1> */}
      {/* <button>Scan QRCODE</button> */}
      {/* <a href={scan}>{scan}</a>
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
      <p>Scanned: </p> */}
        <a href={scan}>{scan}</a>
    </div>
  );
}

export default QRCodeScanner;
