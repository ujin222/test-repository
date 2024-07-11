import React from "react";
import styles from "./Colorinput.module.css";

function Colorinput({ colorCodeValue, handleChange }) {
  const onChange = (e) => {
    handleChange(e.target.value);
  };
  const isValidColorCode = (colorCodeValue) => {
    // 첫 자리 #, 뒤에 여섯자리는 영소문자 a-f, 영대문자 A-F, 숫자 0-9 (정규식)
    const regxp = /^#[a-fA-F0-9]{6}$/;
    return regxp.test(colorCodeValue);
  };
  const handleBlur = () => {
    if (!isValidColorCode(colorCodeValue)) {
      // 잘못된 코드를 입력했을 때
      alert(
        "컬러코드 # + 영소문자 a-f 또는 영대문자 A-F, 숫자 0-9 를 조합한 여섯자리를 입력해주세요. "
      );
      handleChange("#000000");
    }
  };
  return (
    <div className={styles.colorInputContainer}>
      <input
        className={styles.colorInput}
        value={colorCodeValue}
        maxLength={7}
        onChange={onChange}
        onBlur={handleBlur}
      />
      <span
        className={styles.colorInputChip}
        style={{ backgroundColor: colorCodeValue }}
      ></span>
    </div>
  );
}

export default Colorinput;
