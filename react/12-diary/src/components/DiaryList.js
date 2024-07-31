import React from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const sortOptionList = [
  { name: "최신순", value: "latest" },
  { name: "오래된 순", value: "oldest" },
];
const filterOptionList = [
  { name: "모두", value: "all" },
  { name: "긍정적 감정", value: "good" },
  { name: "부정적 감정", value: "bad" },
];

function ControlMenu({ optionList }) {
  return (
    <select className="ControlMenu">
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList(props) {
  const navigate = useNavigate();
  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="control_menus">
          <ControlMenu optionList={sortOptionList} />
          <ControlMenu optionList={filterOptionList} />
        </div>
        <div className="new_btn">
          <Button
            text={"새 일기 쓰기"}
            type="positive"
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>
      <DiaryItem />
    </div>
  );
}

export default DiaryList;
