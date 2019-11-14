import React from "react";

const LoginCode = (props) => {
  console.log("LoginCode props", props);
  return (
    <div className="row d-flex align-items-center flex-column">
      <div className="qr-code-area">
        {props.qrImg && (
          <div className="qr-code">
            <img alt="qr-code" src={`data:image/jpeg;base64,${props.qrImg}`} />
          </div>
        )}
      </div>
      <button type="button" className="btn btn-primary mt-2" onClick={props.loadQrCode}>
        Generate New
      </button>
    </div>
  );
};

export default LoginCode;
