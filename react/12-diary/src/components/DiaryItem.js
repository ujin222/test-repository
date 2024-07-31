import React from "react";
import Button from "./Button";
import "./DiaryItem.css";

function DiaryItem(props) {
  return (
    <div className="diaryItem">
      <div className="emotion_img_wrapper emotion_img_wrapper_1">
        <img src="assets/emotion1.png" />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">2024. 7. 31.</div>
        <div className="diary_content_preview">7월 마지막 날이에용</div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
}

export default DiaryItem;