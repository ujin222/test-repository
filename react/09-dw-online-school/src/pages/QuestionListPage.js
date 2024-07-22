import React, { useEffect, useState } from "react";
import ListPages from "../components/ListPages";
import styles from "./QuestionListPage.module.css";
import searchImg from "../assets/search.svg";
import QuestionItem from "../components/QuestionItem";
import { getDatas } from "../api/firebase";

let listItems;

function QuestionListPage(props) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("questions");
    listItems = resultData; // 검색용으로 사용할 전체 데이터를 가지고 있어야 해서 저장해주는 것.
    setItems(resultData);
    // console.log(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <ListPages variant="community">
        <form className={styles.form}>
          <input placeholder="검색으로 코스 찾기" />
          <button>
            <img src={searchImg} />
          </button>
        </form>

        <p className={styles.count}>총 {items.length}개 코스</p>

        <div className={styles.questionList}>
          {items.map((question) => (
            <QuestionItem key={question.docId} question={question} />
          ))}
        </div>
      </ListPages>
    </div>
  );
}

export default QuestionListPage;
