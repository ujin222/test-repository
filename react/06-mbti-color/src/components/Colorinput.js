import React from "react";
import styles from "./Colorinput.module.css";

function Colorinput(props) {
  return (
    <div className={styles.colorInputContainer}>
      <input className={styles.colorInput} value="F2F2F2" />
      <span
        className={styles.colorInputChip}
        style={{ backgroundColor: "#f2f2f2" }}
      ></span>
    </div>
  );
}

export default Colorinput;
