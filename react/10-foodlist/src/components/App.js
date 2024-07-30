import "./App.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import searchImg from "../assets/ic-search.png";
import { useEffect, useState } from "react";
import {
  getDatasOrderByLimit,
  deleteDatas,
  addDatas,
  updateDatas,
  getDatas,
  getSearchDatas,
} from "../api/firebase";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "../hooks/useTranslate";

const LIMITS = 5;
let listItems;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);
  const [search, setSearch] = useState([]);
  const t = useTranslate();

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasOrderByLimit(
      "foodit",
      options
    );
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
  };

  // 확인 버튼
  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };

  // 최신순, 칼로리순
  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  // 더보기
  const handleMoreClick = async () => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: lq });
  };

  // 삭제 버튼
  const handleDelete = async (docId, imgUrl) => {
    // 파이어베이스 접근 => imgUrl 로 스토리지에 저장된 사진 삭제
    // const result = await deleteDatas("foodit", docId, imgUrl);
    // if (!result) {
    //   alert("삭제할 이미지 파일이 없습니다. 다시 시도하세요.");
    //   return false;
    // }
    // docId 사용 => 문서 삭제
    //   setItems((prevItems) => {
    //     const deleteArr = prevItems.filter((item) => {
    //       return item.docId !== docId;
    //     });
    //     return deleteArr;
    //   });
    //   setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
    // };

    // items 에서 docId 를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제)
    const { result, message } = await deleteDatas("foodit", docId, imgUrl);
    if (!result) {
      alert(message);
      return;
    }
    // 삭제 성공시 화면에 그 결과를 반영한다.
    setItems((prevItems) =>
      prevItems.filter(function (item) {
        return item.docId !== docId;
      })
    );
  };

  // 수정 후 확인 버튼 누르면 새로고침 없이 바로 화면 출력
  const handleUpdateSuccess = (result) => {
    setItems((prevItems) => {
      const deleteIdx = prevItems.findIndex((item) => item.id === result.id);

      return [
        ...prevItems.slice(0, deleteIdx),
        result,
        ...prevItems.slice(deleteIdx + 1),
      ];
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search === "") {
      handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
    } else {
      const resultData = await getSearchDatas("foodit", {
        limits: LIMITS,
        search: search,
      });
      setItems(resultData);
    }
  };

  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
  }, [order]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm onSubmit={addDatas} onSubmitSuccess={handleAddSuccess} />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSearchSubmit}>
            <input className="App-search-input" onChange={handleSearchChange} />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
            >
              {t("newest")}
            </AppSortButton>
            <AppSortButton
              selected={order === "calorie"}
              onClick={handleCalorieClick}
            >
              {t("calories")}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdateSuccess={handleUpdateSuccess}
          onUpdate={updateDatas}
        />
        {hasNext && (
          <button className="App-more-button" onClick={handleMoreClick}>
            {t("load more")}
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <LocaleSelect />
          <div className="App-footer-menu">
            {t("terms od service")} | {t("privary policy")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
