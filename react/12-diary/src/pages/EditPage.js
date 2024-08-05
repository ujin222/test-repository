import React, { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { changeTitle } from "../util/changeTitle";

function EditPage(props) {
  const { id } = useParams();
  const { diaryList } = useContext(DiaryStateContext);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    changeTitle(`감정 일기장 - ${id}번 일기 수정`);
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((diary) => diary.id == id);
      // console.log(targetDiary);

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("오류입니다. 다시 시도하세요.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList]);

  return <div>{data && <DiaryEditor originData={data} isEdit={true} />}</div>;
}

export default EditPage;
