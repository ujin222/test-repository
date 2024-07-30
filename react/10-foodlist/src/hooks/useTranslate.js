import React from "react";
import { useLocale } from "../contexts/LocaleContext";

// dict 는 사전 객체, 각 언어별 단어 기재
const dict = {
  ko: {
    newest: "최신순",
    calories: "칼로리순",
    "load more": "더보기",
    "terms od service": "서비스 이용약관",
    "privary policy": "개인정보 처리방침",
    "title placeholder": "이름을 입력해주세요.",
    "content placeholder": "내용을 입력해주세요.",
    "edit button": "수정",
    "delete button": "삭제",
    "cancel button": "취소",
    "confirm button": "확인",
  },
  en: {
    newest: "New",
    calories: "Kcal",
    "load more": "Load more",
    "terms od service": "Terms od service",
    "privary policy": "Privary policy",
    "title placeholder": "Typing title",
    "content placeholder": "Typing content",
    "edit button": "edit",
    "delete button": "delete",
    "cancel button": "cancel",
    "confirm button": "Ok",
  },
};

function useTranslate(props) {
  const locale = useLocale();
  function translate(key) {
    const language = dict[locale];
    const value = language[key];
    return value;
    //   const translate = (key) => dict[locale][key] || "";
    // dict[locale][key]는 특정 키에 대한 번역된 텍스트를 가져옴
  }

  return translate;
}

export default useTranslate;
