import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-Xgm8hylanynZoejN2ZKVqBmL57MLROE",
  authDomain: "myunsplash-4cc7b.firebaseapp.com",
  projectId: "myunsplash-4cc7b",
  storageBucket: "myunsplash-4cc7b.appspot.com",
  messagingSenderId: "478385853205",
  appId: "1:478385853205:web:c76d1619e84c5f7e644f1c"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export {storage, db}