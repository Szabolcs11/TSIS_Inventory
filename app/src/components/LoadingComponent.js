import React from "react";
import ReactLoading from "react-loading";

function LoadingComponent({ type, color, bgcolor }) {
  return (
    <div style={{ backgroundColor: bgcolor, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ReactLoading type={type} color={color} />
    </div>
  );
}

export default LoadingComponent;
