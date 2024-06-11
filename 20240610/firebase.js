const firebaseConfig = {
  apiKey: "AIzaSyCdepb9BBPmg3sBTUbHKnY9oQUhzQixLAY",
  authDomain: "myproject-92dc6.firebaseapp.com",
  projectId: "myproject-92dc6",
  storageBucket: "myproject-92dc6.appspot.com",
  messagingSenderId: "491165845156",
  appId: "1:491165845156:web:7e32389914ab53eb150831",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}

async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
}
