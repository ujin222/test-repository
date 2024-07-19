import React from "react";
import ListPages from "../components/ListPages";
import Container from "../components/Container";
import styles from "./Join.module.css";

function Join(props) {
  return (
    <ListPages variant="join">
      <Container className={styles.container}>
        <label className={styles.label}>아이디</label>
        <input type="text" className={styles.input}></input>
        <label className={styles.label}>비밀번호</label>
        <input type="password" className={styles.input}></input>
        <label className={styles.label}>비밀번호 확인</label>
        <input type="password" className={styles.input}></input>
        <label className={styles.label}>이름</label>
        <input type="text" className={styles.input}></input>
        <label className={styles.label}>생년월일</label>
        <input type="date"></input>
        <label className={styles.label}>성별</label>
        <input type="radio">남성</input>
        <input type="radio">여성</input>
        <label className={styles.label}>전화번호</label>
        <input type="text" className={styles.input}></input>
      </Container>
    </ListPages>
  );
}

export default Join;
