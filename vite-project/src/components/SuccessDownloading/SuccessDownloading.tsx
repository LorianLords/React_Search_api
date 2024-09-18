import React, { useEffect, useState } from "react";
import "../../App.css";

const successDownloading = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
    setTimeout(() => {
      setIsVisible(false);
    }, 2800);
  }, []);
  return (
    <div className={`alert-success ${isVisible ? "success" : ""}`}>
      <p>Downloading is success</p>
    </div>
  );
};

export default successDownloading;
