import React from "react";
import exImg from "../assets/star.jpg";
import "./FoodList.css";

function FoodList(props) {
  return (
    <div className="FoodListItem">
      <img className="FoodListItem-img" src={exImg} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">이름</h1>
          <span className="FoodListItem-calorie">0Kcal</span>
        </div>
        <p className="FoodListItem-content">내용</p>
        <div className="FoodListItem-date-button">
          <p className="FoodListItem-date">날짜</p>
          <div className="FoodListItem-button">
            <button className="FoodListItem-edit-button">수정</button>
            <button className="FoodListItem-delete-button">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
