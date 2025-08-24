import React from "react";

const Loader: React.FC = () => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "6px",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent"
  }}>
    <div style={{
      width: "32px",
      height: "6px",
      borderRadius: "3px",
      background: "linear-gradient(90deg,#3B82F6 0%,#06B6D4 100%)",
      animation: "loaderBarAnim 1s cubic-bezier(.4,0,.2,1) infinite"
    }} />
  </div>
);

export default Loader;
