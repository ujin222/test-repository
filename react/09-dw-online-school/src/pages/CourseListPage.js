import React, { useEffect, useState } from "react";
import ListPages from "../components/ListPages";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";

let listItems;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState("");

  const handleKeywordChange = (e) => {
    const keyword = e.target.value;
    // 사용자가 입력한 키워드를 state에 저장한다.
    setKeywords(keyword);
  };

  const handleSubmit = (e) => {
    // 전체 데이터를 가지고 있는 listItems 를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    setItems((listItems) => [...listItems.title, keywords]);
    // 만든 배열을 items state 에 set 한다.
    setItems("");
  };

  const handleLoad = async () => {
    // firebase의 courses 데이터 가져오기
    const resuleData = await getDatas("courses");
    // 전체데이터 변수에 저장
    listItems = resuleData;
    // 가져온 데이터 콘솔로 확인
    console.log(resuleData);
    // items state에 set 해주기
    setItems(resuleData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPages variant="catalog">
      <form className={styles.form}>
        <input onChange={handleKeywordChange} />
        <button onSubmit={handleSubmit}>
          <img src={searchImg} />
        </button>
      </form>

      <p className={styles.count}>총 {items.length}개 코스</p>

      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem key={course.docId} course={course} />;
        })}
      </div>
    </ListPages>
  );
}

export default CourseListPage;
