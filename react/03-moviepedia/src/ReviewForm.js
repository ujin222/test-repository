import React, { useContext, useState, useTransition } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";
import { LocaleContext, useLocale } from "./contexts/LocaleConext";
import useTranslate from "./Hooks/useTranslate";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  onSubmit,
  handleSubmitSuccess,
  // ↑ App
  // ↓ ReviewList
  initialPreview,
  initialValues = INITIAL_VALUE,
  handleCancle,
}) {
  const [values, setValues] = useState(initialValues);
  // const [item, setItem] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const locale = useLocale();
  const t = useTranslate();

  const handleChange = (name, value) => {
    // setItem(2);
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setValues({ [name]: value });
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 버튼 비활성화
    setIsSubmitting(true);
    const result = await onSubmit("movie", values);
    handleSubmitSuccess(result);

    // 버튼 활성화
    setIsSubmitting(false);

    setValues(INITIAL_VALUE);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName="imgUrl"
          setFile={handleChange}
          value={values.imgUrl}
          initialPreview={initialPreview}
        />
      </div>
      <div className="form-container">
        <input
          type="text"
          name="title"
          placeholder={t("title placeholder")}
          onChange={handleInputChange}
          value={values.title}
        />
        <RatingInput
          inputName="rating"
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name="content"
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          value={values.content}
        />

        {handleCancle && (
          <button onClick={() => handleCancle(null)}>
            {t("cancle button")}
          </button>
        )}

        <button type="submit" disabled={isSubmitting}>
          {t("confirm button")}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
