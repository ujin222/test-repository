import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseItem from "../components/CourseItem";
import CloseButtonImg from "../assets/closeButton.svg";
import styles from "./WishlistPage.module.css";
import { getData, getDatas, getMember, updateDatas } from "../api/firebase";
import Warn from "../components/Warn";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function WishListPage() {
  // courseList state 필요.
  const [items, setItems] = useState([]);
  const member = JSON.parse(localStorage.getItem("member"));

  // handleLoad 함수에서 로그인 사용자의 email 로 member 문서 가져오고
  // 문서 안에 있는 courseList 를 state 에 set 한다.   (getData 사용)
  const handleLoad = async () => {
    const resultData = await getData("member", {
      field: "email",
      condition: "==",
      value: member.email,
    });
    setItems(resultData.courseList);
  };

  const handleDelete = async (course) => {
    const result = await updateDatas("member", member.docId, course, {
      type: "DELETE",
      fieldName: "courseList",
    });
    handleLoad();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>나의 위시리스트</h1>
      {items.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 놓은 코스가 없어요."
            description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
          />
          <div className={styles.link}>
            <Link to="/courses">
              <Button>코스 찾아보기</Button>
            </Link>
          </div>
        </>
      ) : (
        <ul className={styles.items}>
          {items.map((course) => {
            return (
              <li className={styles.item} key={course.slug}>
                <CourseItem course={course} />
                <img
                  className={styles.delete}
                  src={CloseButtonImg}
                  onClick={() => handleDelete(course)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}

export default WishListPage;
