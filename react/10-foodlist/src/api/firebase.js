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
  where,
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
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("foodit/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장 (확인 버튼 누르면 바로 화면 출력)
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

// 사진 등록
async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

// 마지막 콘텐츠 1개 가져오기
async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

// limit에 지정한 숫자만큼만 컨텐츠를 보여줌, 정렬
async function getDatasOrderByLimit(collectionName, options) {
  const { fieldName, limits } = options;
  let q;
  if (!options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      startAfter(options.lq),
      limit(limits)
    );
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map(function (doc) {
    return { ...doc.data(), docId: doc.id };
  });
  return { resultData, lastQuery };
}

// 정렬.
// async function getDatasByOrder(collectionName, options) {
//   const q = query(
//     getCollection(collectionName),
//     orderBy(options.order, "desc")
//   );
//   const snapshot = await getDocs(q);
//   const resultData = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     docId: doc.id,
//   }));
//   return resultData;
// }

// // 삭제 버튼 부분
// async function deleteDatas(collectionName, docId, imgUrl) {
//   // 1. 스토리지 객체 가져오기
//   const storage = getStorage();

//   try {
//     // 2. 스토리지에서 이미지 삭제
//     const deleteImg = ref(storage, imgUrl);
//     await deleteObject(deleteImg);

//     // 3. 컬렉션에서 문서 삭제
//     const docRef = await doc(db, collectionName, docId);
//     await deleteDoc(docRef);

//     return true;
//   } catch (error) {
//     return false;
//   }
// }

async function deleteDatas(collectionName, docId, imgUrl) {
  // 스토리지에 있는 이미지 삭제할 때 필요한 것 ==> 파일명(경로포함) or 파일url
  // 스토리지 객체 생성
  const storage = getStorage();
  let message;
  try {
    // 이미지 삭제 부분
    message = "이미지 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 삭제할 파일의 참조객체 생성(ref 함수 사용)
    const deleteRef = ref(storage, imgUrl);
    // 파일 삭제
    await deleteObject(deleteRef);

    // 문서 삭제 부분
    message = "문서 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 삭제할 문서의 참조객체 생성(doc 함수 사용)
    const deleteDocRef = doc(db, collectionName, docId);
    // 문서 삭제
    await deleteDoc(deleteDocRef);

    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
}

// 수정 버튼 부분
async function updateDatas(collectionName, dataObj, docId) {
  const docRef = await doc(db, collectionName, docId);
  // 수정할 데이터 양식 => imgUrl, title, calorie, content, updatedAt
  // updatedAt (작성시간 변경)
  const time = new Date().getTime();
  dataObj.updatedAt = time;
  // 사진 수정 (기존 사진 삭제, 새로운 사진 추가, imgUrl 값 변경)
  if (dataObj.imgUrl !== null) {
    // 기존 사진 url 가져오기
    const docSnap = await getDoc(docRef);
    const prevImgUrl = docSnap.data().imgUrl;
    // 스토리지에서 기존 사진 삭제
    const storage = getStorage();
    const deleteImg = ref(storage, prevImgUrl);
    await deleteObject(deleteImg);
    // 새로운 사진 추가
    // const uuid = crypto.randomUUID();
    // const path = `foodit/${uuid}`;
    // const url = await uploadImage(path, dataObj.imgUrl);
    const url = await uploadImage(createPath("foodit/", dataObj.imgUrl));
    dataObj.imgUrl = url;
  } else {
    // imgUrl 프로퍼티 삭제. 이거 삭제 왜 하는데?
    // 수정 from 에서 imgUrl 기본값을 null 로 넣어줬기 때문에 사진을 수정하지 않고
    // 그 상태로 문서를 업데이트 하면 imgUrl 값이 null 로 바뀜.
    delete dataObj["imgUrl"];
    // ※ 사진 수정 안 하고 다른 것만 수정 했을 경우
  }
  // 문서 부분 수정
  await updateDoc(docRef, dataObj);
  const updateItem = await getDoc(docRef);
  const resultData = { docId: updateItem.id, ...updateItem.data() };
  return resultData;
}

// 검색
async function getSearchDatas(collectionName, options) {
  const q = query(
    getCollection(collectionName),
    where("title", ">=", options.search),
    where("title", "<=", options.search + "\uf8ff"),
    limit(options.limits)
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.Id }));
  return resultData;
}

export {
  addDatas,
  getDatasOrderByLimit,
  deleteDatas,
  updateDatas,
  getSearchDatas,
};
