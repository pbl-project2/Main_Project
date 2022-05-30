import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useHistory } from "react-router-dom";
import "../Styling/QRCodeScanner.css";
import Footer from "./Footer";
function PaymentsQrScanner() {
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
    document.title = "UpMenu | Payments";
  }, []);
  return (
    <div className="qrcode_main">
      <nav>
        <h3>UpMenu</h3>
        <button
          className="login-btn"
          onClick={() =>
            history.push(`/bill/${window.location.pathname.split("/")[2]}`)
          }
        >
          Back
        </button>
      </nav>
      <div className="qr-code-scanner">
        <div className="qrcode">
          <div className="row11">
            <BarcodeScannerComponent
              height={76}
              width={76}
              onUpdate={(err, res) => {
                if (res) {
                  let result = res.toString();
				  console.log(result);
                  // setScan(res.text);
                  window.location.href = res.text;
                  setScan("");
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

export default PaymentsQrScanner;
