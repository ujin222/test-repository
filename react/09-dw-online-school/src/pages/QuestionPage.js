import React from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation } from "react-router-dom";
import DateText from "../components/DateText";
import Lined from "../components/Lined";
import Warn from "./../components/Warn";
import DOMPurify from "dompurify";

function QuestionPage() {
  const { question } = useLocation().state;
  //   console.log(question);
  const { title, createdAt, answers, writer, content } = question;

  const sanitizedData = (data) => {
    // sanitize 는 소독한다는 뜻. 안의 이벤트(데이터)들을 없애주는 역할을 한다.
    return { __html: DOMPurify.sanitize(data) };
  };

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>
                  <DateText value={createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={writer} />
            </div>
            {/* <p className={styles.content}>{content}</p> */}
            <p
              className={styles.content}
              dangerouslySetInnerHTML={sanitizedData(content)}
              // dangerouslyInnerHTML 은 위험한 코드. <span onClick={alert('악성코드')}>test</span> 의 태그모형은 사라지지만 그 안에 이벤트(악성코드)는 남아있다.
              // 그래서 꼭 sanitized 코드와 같이 써줘야 한다.
            />
          </div>
        </Container>
      </div>

      <Container className={styles.answers}>
        <h2 className={styles.count}>
          <Lined>{answers.length}개 답변</Lined>
        </h2>

        {answers.length > 0 ? (
          answers.map((answer) => <Answer key={answer.id} answer={answer} />)
        ) : (
          <Warn
            title="답변을 기다리고 있어요."
            description="이 질문의 첫 번째 답변을 달아주시겠어요?"
          />
        )}
      </Container>
    </>
  );
}

export default QuestionPage;
