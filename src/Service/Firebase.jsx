import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDoGCC7bPkRoNO_OorFZh4N_Gj_F35z3Q0",
  authDomain: "trekly-ce42e.firebaseapp.com",
  projectId: "trekly-ce42e",
  storageBucket: "trekly-ce42e.appspot.com",
  messagingSenderId: "304979377778",
  appId: "1:304979377778:web:62cfbc1bdbd0f055a78ceb",
  measurementId: "G-8R3Z8WTCDR"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);