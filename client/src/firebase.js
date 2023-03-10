import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcAzFTKoGdlX2Q_IvD0weSsT5SNN1dWCA",
  authDomain: "ctushare-d62a8.firebaseapp.com",
  projectId: "ctushare-d62a8",
  storageBucket: "ctushare-d62a8.appspot.com",
  messagingSenderId: "418115810081",
  appId: "1:418115810081:web:440fc32f02cb6127ff8460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)