import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWJmm37hMxEa5ZCbL5QQUKxQGNfTFgefQ",
  authDomain: "dwos-ce528.firebaseapp.com",
  projectId: "dwos-ce528",
  storageBucket: "dwos-ce528.appspot.com",
  messagingSenderId: "712559398073",
  appId: "1:712559398073:web:00e39a92b8a153b55ddf68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 내용 가져오기
async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return resultData;
}

export { getDatas };
