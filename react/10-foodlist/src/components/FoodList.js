import React from "react";
import exImg from "../assets/preview-placeholder.png";
import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} `;
}

function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  return (
    <div className="FoodListItem">
      <img className="FoodListItem-img" src={imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h2 className="FoodListItem-title">{title}</h2>
          <span className="FoodListItem-calorie">{calorie}kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-button">
          <p className="FoodListItem-date">{formatDate(createdAt)}</p>
          <div className="FoodListItem-button">
            <button className="FoodListItem-edit-button">수정</button>
            <button className="FoodListItem-delete-button">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li key={item.docId}>
            <FoodListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
