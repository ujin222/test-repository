import React, { useState, useTransition } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { addDatas } from "../api/firebase";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgUrl: null,
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({
  onSubmit,
  onSubmitSuccess,
  initialPreview,
  initialValues = INITIAL_VALUES,
  onCancel,
}) {
  const [values, setValues] = useState(initialValues);
  // 확인 버튼 돌아가는 도중에 더 누르지 못하게
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslate();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };
  // 확인 누르면 바로 화면에 출력되게끔
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const resultData = await onSubmit("foodit", values);
    onSubmitSuccess(resultData);
    setIsSubmitting(false);
    setValues(INITIAL_VALUES);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        onChange={handleChange}
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            type="text"
            onChange={handleInputChange}
            placeholder={t("title placeholder")}
            name="title"
            value={values.title}
          />
          <input
            className="FoodForm-calorie"
            type="number"
            onChange={handleInputChange}
            name="calorie"
            value={values.calorie}
          />
          {onCancel && (
            <button
              className="FoodForm-cancel-button"
              type="button"
              onClick={() => onCancel(null)}
            >
              {t("cancel button")}
            </button>
          )}

          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {t("confirm button")}
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          onChange={handleInputChange}
          placeholder={t("content placeholder")}
          name="content"
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
