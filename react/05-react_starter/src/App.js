import React, { useEffect, useState } from "react";

function App(props) {
  const [num, setNum] = useState(0);
  // console.log("app 컴포넌트 렌더링 ...");
  const [text, setText] = useState("");

  const handleButton = () => {
    setNum(num + 1);
  };
  const handleInput = (e) => {
    const nextText = e.target.value;
    setText(nextText);
  };
  useEffect(() => {
    console.log("나는 화면이 최초 렌더링될 때 실행되는 uef 야.");
  }, []); // useEffect 는 화면이 최초 렌더링될 때 실행되는 것. [] 안에 아무것도 적지 않으면 최초 1회에만 적용
  useEffect(() => {
    console.log("나는 num 이 변경될 때 실행되는 uef 야.");
  }, [num]); // [](디펜던시 리스트) 안에는 react 가 무엇을 지켜볼지를 작성.
  useEffect(() => {
    console.log("나는 text 가 변경될 때 실행되는 uef 야.");
  }, [text]); // [] 안에 넣어준 객체에서만 반복 적용. (최초 1회는 무조건 실행)

  return (
    <div>
      <input type="text" placeholder="Search here" onChange={handleInput} />
      <h2>입력한 값: {text}</h2>
      <h1>{num}</h1>
      <button onClick={handleButton}>Click Me</button>
    </div>
  );
}

export default App;
