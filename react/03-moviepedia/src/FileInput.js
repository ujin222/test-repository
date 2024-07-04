import React from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";
import { initializeApp } from "firebase/app";

function FileInput({ name, onChange }) {
  const handleFileChange = (e) => {
    // onChange(e);
    const nextFile = e.target.files[0];
    onChange(name, nextFile);
    console.log(nextFile);
  };
  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={placeholderImg} />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        onChange={handleFileChange}
      />
      <button className="FileInput-clear-button">
        <img src={resetImg} />
      </button>
    </div>
  );
}

export default FileInput;
