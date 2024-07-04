import { useEffect, useState } from "react";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import ticketImg from "./assets/ticket.png";
import mockItems from "./mock.json";
import {
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
} from "./assets/firebase";
// import { limit } from "firebase/firestore";

// 10개까지만 보여줌. 이후엔 더보기버튼 활성화
const LIMIT = 10;

// 최신순, 베스트순 버튼 활성화
function AppSortButton({ children, onClick, selected }) {
  let isSelected = "";
  if (selected) {
    isSelected = "selected";
  }
  return (
    <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  //
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );

    //
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);

    // setItems(resultData);
    // setLq(lastQuery)
  };

  // 최신, 베스트 버튼
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  // 더보기 버튼
  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  // 파이어베이스 불러오기 (영화 정보)
  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);
  // [] 안에 items 를 적으면 무한루프가 돌며 파이어베이스 초과될 수 있으니 써선 안 됨.

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            최신순
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            베스트순
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더보기
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
