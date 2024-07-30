import React, { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} `;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt, docId, id } = item;
  const t = useTranslate();

  const handleEditClick = () => {
    onEdit(id);
  };

  const handleDeleteClick = () => {
    onDelete(docId, imgUrl);
  };

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
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              {t("edit button")}
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              {t("delete button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  // 수정
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, calorie, content, docId, imgUrl } = item;
          const initialValues = { title, calorie, content, imgUrl: null };
          const handleSubmit = (collectionName, dataObj) => {
            const result = onUpdate(collectionName, dataObj, docId);
            return result;
          };
          const handleSubmitSucces = (result) => {
            onUpdateSuccess(result);
            setEditingId(null);
          };
          return (
            <li key={item.docId}>
              <FoodForm
                onCancel={setEditingId}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSucces}
                initialValues={initialValues}
                initialPreview={imgUrl}
              />
            </li>
          );
        }
        return (
          <li key={item.docId}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
