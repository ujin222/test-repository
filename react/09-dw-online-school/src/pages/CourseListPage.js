import React, { useEffect, useState } from "react";
import ListPages from "../components/ListPages";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";
import Warn from "../components/Warn";

let listItems;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장한다.
    setKeyword(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   // 전체 데이터를 가지고 있는 listItems 를 활용해
  //   // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
  //   setItems((listItems) => [...listItems.title, keywords]);
  //   // 만든 배열을 items state 에 set 한다.
  //   setItems("");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는 listItems 를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    // const searchItems = listItems.filter(function(item) {
    //     return item.title.includes(keyword);
    // });
    // // 만든 배열을 items state 에 set 해준다.
    // setItems(searchItems);
    setItems(listItems.filter(({ title }) => title.includes(keyword)));
  };

  const handleLoad = async () => {
    setIsLoading(true);
    // firebase의 courses 데이터 가져오기
    const resuleData = await getDatas("courses");
    // 전체데이터 변수에 저장
    listItems = resuleData;
    // 가져온 데이터 콘솔로 확인
    console.log(resuleData);
    // items state에 set 해주기
    setItems(resuleData);
    setIsLoading(false);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPages variant="catalog">
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          onChange={handleKeywordChange}
          placeholder="검색으로 코스 찾기"
        />
        <button onSubmit={handleSubmit}>
          <img src={searchImg} />
        </button>
      </form>

      <p className={styles.count}>총 {items.length}개 코스</p>
      {items.length === 0 && !isLoading ? (
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 코스가 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해주세요."
        />
      ) : (
        <div className={styles.courseList}>
          {items.map((course) => {
            return <CourseItem key={course.docId} course={course} />;
          })}
        </div>
      )}
    </ListPages>
  );
}

export default CourseListPage;
