import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import "../Styling/QRCodeScanner.css";

function QRCodeScanner() {
  const [scan, setScan] = useState("");
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
      <a href={scan}>{scan}</a>
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
        <BarcodeScannerComponent
          height={700}
          width={700}

          onUpdate={(err, res) => {
            if (res) {
              setScan(res.text);
              window.location.href = res.text;
            } else console.log(err);
          }}
          facingMode="environment"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default QRCodeScanner;
