import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu17NqnIfVcSmOzpviS_F6O7JKKwnB2Fk",
  authDomain: "mbti-project-f52d8.firebaseapp.com",
  projectId: "mbti-project-f52d8",
  storageBucket: "mbti-project-f52d8.appspot.com",
  messagingSenderId: "619468750632",
  appId: "1:619468750632:web:272883752f58c2b3435a1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order, lq) {
  const collect = collection(db, collectionName);
  // 정렬. query, orderBy 함수 사용. "desc"는 내림차순
  let q = query(collect, orderBy(order, "desc"), limit(10));
  if (lq) {
    q = query(collect, orderBy(order, "desc"), startAfter(lq), limit(10));
  }
  const querySnapshot = await getDocs(q);
  const lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };
  //   debugger;
  // debugger 사용 시, 콘솔 창에서 디버거 사용 이전의 함수들을 이용해
  // 미리 작성해서 결과를 확인할 수 있다.
}

// 파이어베이스에 데이터 추가
async function addDatas(collectionName, dataObj) {
  const collect = collection(db, collectionName);
  // id 값 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  // 날짜 생성
  const time = new Date().getTime();
  // 추가할 data 객체에 필요한 필드 정보 추가
  dataObj.id = lastId;
  dataObj.createdAt = time;
  dataObj.updatedAt = time;
  // 문서에 data 객체 저장
  const result = await addDoc(collect, dataObj);
  return result;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export { getAllDatas, addDatas };
