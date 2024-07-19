import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import catalogImg from "../assets/catalog.svg";
import communityImg from "../assets/community.svg";
import joinImg from "../assets/icon--join.png";

const dataDict = {
  catalog: {
    src: catalogImg,
    title: "모든 코스",
    description: "자체 제작된 코스들로 기초를 쌓으세요.",
  },
  community: {
    src: communityImg,
    title: "커뮤니티",
    description: "DW온라인스쿨의 2만 수강생들과 함께 공부해봐요",
  },
  join: {
    src: joinImg,
    title: "회원가입",
    description: "회원가입 서비스입니다.",
  },
};

function ListPages({ variant, children }) {
  const { src, title, description } = dataDict[variant];
  return (
    <>
      <div className={cn(styles.bg, styles[variant])}>
        <img className={styles.icon} src={src} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default ListPages;
