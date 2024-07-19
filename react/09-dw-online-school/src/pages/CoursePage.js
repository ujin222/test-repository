import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import getCourseColor from "../utils/getCourseColor";
import { getData, updateDatas } from "../api/firebase";
import styles from "./CoursePage.module.css";
import Button from "../components/Button";

function CoursePage() {
  const navigate = useNavigate();
  const props = useLocation();
  const { pathname } = props;
  const { courseSlug } = useParams();

  const [course, setCourse] = useState();

  // ? 앞에 쓴 요소가 undefined Or null 일 때, 뒤에 있는 요소를 다시 한번 뒤져본다.
  const courseColor = getCourseColor(course?.code);
  const headerStyle = {
    borderColor: courseColor,
  };

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishlistClick = async () => {
    // 귀찮아도 함수로 만들어서 쓰기 ^^
    const member = JSON.parse(localStorage.getItem("member"));

    if (member) {
      const result = await updateDatas("member", member.docId, course, {
        type: "ADD",
        fieldName: "courseList",
      });
      if (result) {
        navigate("/wishlist");
      } else {
        alert("코스 담기 오류 \n관리자에게 문의하세요.");
      }
    } else {
      alert("로그인을 해주세요.");
      navigate("/login", { state: pathname });
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
