import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { addDatas, db, getQuery, getRealTimemessages } from "../api/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState("");
  // const [messages, setMessages] = useState([]);
  const conditions = [];
  const orderBys = [{ field: "createdAt", direction: "asc" }];
  const LIMITS = 100;
  const q = getQuery("messages", { conditions, orderBys, limits: LIMITS });
  const [messages] = useCollectionData(q);
  const dummy = useRef();

  // console.log(auth);

  const sendMessage = async (e) => {
    e.preventDefault();
    // 저장할 데이터 객체를 생성 (text, createdAt, photoUrl, uid)
    const { uid, photoURL } = auth?.currentUser;
    const addObj = {
      text: inputValue,
      createdAt: serverTimestamp(),
      uid: uid,
      photoUrl: photoURL,
    };
    // 데이터베이스에 객체 저장
    await addDatas("messages", addObj);
    // inputValue 를 빈 문자열로 다시 셋팅
    setInputValue("");
  };

  // useEffect(() => {
  //   const unsubscribe = getRealTimemessages("messages", setMessages);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // 채팅 올라올 때마다 스크롤을 <span></span>으로 이동
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
    // scrollIntoView() 함수는 자신이 호출된 요소가 사용자에게 표시되도록 상위 컨테이너를 스크롤한다.
    // true 는 위로, false 는 아래로
    // behavior: 'smooth' 는 스무스하게 아래로
  }, [messages]);

  return (
    <>
      <main>
        {messages?.map((message, idx) => {
          return <ChatMessage key={idx} message={message} auth={auth} />;
        })}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit" disabled={!inputValue}>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
