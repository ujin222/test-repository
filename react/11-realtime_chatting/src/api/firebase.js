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
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNkNHjpZUlDir1rSEJ130WiHZt_b2Vfv4",
  authDomain: "message-115d7.firebaseapp.com",
  projectId: "message-115d7",
  storageBucket: "message-115d7.appspot.com",
  messagingSenderId: "69633630805",
  appId: "1:69633630805:web:de1d5501d7d3cedd00aadc",
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

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

function getRealTimemessages(collectionName, setData) {
  const collect = collection(db, "messages");
  const q = query(collect, orderBy("createdAt"), limit(100));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  const condition = [
    { field: "text", operator: "==", value: "test" },
    { field: "uid", operator: "==", value: "xjdiwjKDJ2jdkxJND2J" },
  ];

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

export { getUserAuth, addDatas, db, getRealTimemessages, getQuery };
