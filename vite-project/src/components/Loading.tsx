import React from "react";
import loadAnim from "../assets/Animation - 1724982467046.gif"
const Loading = () => {
  return (
    <div
      style={{
        display: "flex ",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "150px",
      }}
    >
      <img src={loadAnim} alt="Loading" />
    </div>
  );
};

export default Loading;
