import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdepb9BBPmg3sBTUbHKnY9oQUhzQixLAY",
  authDomain: "myproject-92dc6.firebaseapp.com",
  projectId: "myproject-92dc6",
  storageBucket: "myproject-92dc6.appspot.com",
  messagingSenderId: "491165845156",
  appId: "1:491165845156:web:7e32389914ab53eb150831",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  // 문서 id 수동

  //   try {
  //     const saveDoc = await doc(db, collectionName, "2");
  //     console.log(`doc() 결과: ${saveDoc}`);
  //     const saveResult = await setDoc(saveDoc, dataObj);
  //     console.log(`setDoc() 결과: ${saveResult}`);
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }

  // 문서 id 자동
  try {
    const collect = collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    return false;
  }
}

export { db, getDatas, addDatas };
