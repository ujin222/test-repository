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

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  // 정렬. query, orderBy 함수 사용. "desc"는 내림차순
  const q = query(collect, orderBy(order, "desc"));
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
  //   debugger;
  // debugger 사용 시, 콘솔 창에서 디버거 사용 이전의 함수들을 이용해
  // 미리 작성해서 결과를 확인할 수 있다.
}

export { getAllDatas };
