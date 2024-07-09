import React, { useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "./../components/ColorSurvey";
import Mock from "../lib/mock.json";

function Home(props) {
  //   console.log(styles);
  const [contents, setContents] = useState([]);
  const mock = <mock />;
  const getMbti = async () => {
    const Mock = await fetch(mock);
    const data = await Mock.json();
    const mbtiArr = data.data.contents;
    console.log(mbtiArr);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeicon} src="/images/x.svg" />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        {}
        <ul className={styles.items}>
          <ColorSurvey />
        </ul>
      </main>
    </div>
  );
}

export default Home;
