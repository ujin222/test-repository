import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "PLUS":
      return { count: state.count + 1 };

    case "MINUS":
      return { count: state.count - 1 };

    default:
      return state;
  }
}

const initialState = { count: 0 };

// reducer(리듀서) 사용 이유?
// 예측 가능: 상태 변경이 예측 가능하고 일관성 있게 이루어짐
// 중앙 집중화된 관리: 여러 상태를 하나의 리듀서에서 관리 하거나, 여러 리듀서를 조합하여 관리할 수 있음 (모든 상태 변경이 하나의 통로(dispatch 통한 액션 전달))
// 상태 관리 복잡성 감소, 상태 변경이 어디서 이뤄지는지 쉽게 추적 가능

function Reducer() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  // const handlePlusClick = () => {
  //   const plus = count + 1;
  //   setCount(plus);
  // };

  // const handleMinusCilck = () => {
  //   const minus = count - 1;
  //   setCount(minus);
  // };

  return (
    <div className="App">
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "PLUS" })}>plus</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>minus</button>
    </div>
  );
}

export default Reducer;
