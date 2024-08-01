import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDocs,
  runTransaction,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq6jKlWmXtGL9ZXz2nCzBhLoE7zuXjo94",
  authDomain: "diary-22b20.firebaseapp.com",
  projectId: "diary-22b20",
  storageBucket: "diary-22b20.appspot.com",
  messagingSenderId: "461587579956",
  appId: "1:461587579956:web:ffed92bea462d4a9b03661",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

// 파이어베이스 등록 시 id를 정하기 위한 마지막 데이터를 가져오기
async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

async function addDatas(collectionName, addObj) {
  try {
    // runTransaction() 은 사용자 여러명이 동시에 등록을 눌렀을 때, id가 순차적으로 들어가게 하기 위해 사용하는 함수.
    const resultData = await runTransaction(db, async (tr) => {
      // ( 마지막 데이터 id + 1 ==> 새 데이터 id)
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;
      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docid: snapshot.id }
        : null;
      return docData;
    });

    return resultData;
  } catch (error) {
    console.log("Error transaction: error");
  }
}

export { getUserAuth, addDatas };
