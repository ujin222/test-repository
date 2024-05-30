import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
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

async function getMembers() {
  const collect = await collection(db, "member");
  const snapshot = await getDocs(collect);

  return snapshot;
}

export { db, getMembers };
