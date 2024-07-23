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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBtNLih7Yt2QKGhj2htRgzyzbyroK6UZk",
  authDomain: "movie-foodit-fa331.firebaseapp.com",
  projectId: "movie-foodit-fa331",
  storageBucket: "movie-foodit-fa331.appspot.com",
  messagingSenderId: "36478736523",
  appId: "1:36478736523:web:af07ecd5668f8b0a825c8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 imgUrl 을 addObj 의 imgUrl 값으로 변경
  const path = createPath("food/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;
  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;
  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updateAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName, addObj));
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName),
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다는 뜻
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

export { addDatas };
