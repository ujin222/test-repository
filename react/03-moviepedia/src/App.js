import { useEffect, useState } from "react";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import mockItems from "./mock.json";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
  updateDatas,
} from "./assets/firebase";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "./Hooks/useTranslate";

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
  const t = useTranslate();

  //
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );
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

  const handleAddSuccess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
  };

  const handleUpdateSuccess = (result) => {
    // 화면처리.. 기존데이터는 items 에서 삭제, 수정된 데이터는 items 의 기존 위치에 추가
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === result.id);

      return [
        ...prevItems.slice(0, splitIdx),
        result,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleDelete = async (docId, imgUrl) => {
    // 1. 파이어베이스에 접근해서 imgUrl 을 사용해 스토리지에 있는 사진파일 삭제

    // 2. docId 를 사용해 문서 삭제
    const result = await deleteDatas("movie", docId, imgUrl);
    // db에서 삭제 성공했을 때만 그 결과를 화면에 반영.
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n관리자에게 문의하세요.");
      return false;
    }

    // 3. items 에서 docId 가 같은 요서(객체)를 찾아서 제거
    setItems((prevItems) => {
      const filteredArr = prevItems.filter((item) => {
        return item.docId !== docId;
      });
      return filteredArr;
    });
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
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
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm
            onSubmit={addDatas}
            handleSubmitSuccess={handleAddSuccess}
          />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            {t("newest")}
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            {t("best")}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            items={items}
            handleDelete={handleDelete}
            onUpdate={updateDatas}
            onUpdateSuccess={handleUpdateSuccess}
          />
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            {t("load more")}
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| {t("privary policy")}</div>
      </footer>
    </div>
  );
}

export default App;
