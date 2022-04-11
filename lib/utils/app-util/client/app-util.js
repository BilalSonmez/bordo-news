import { initializeApp } from "firebase/app";

AppUtil = {
  temp: new ReactiveDict(null, {}),
  refreshTokens: new ReactiveDict(null, {})
};

Template.registerHelper('appUtil', function () {
  return AppUtil;
});

const firebaseConfig = {
  apiKey: "AIzaSyBgbGagmgJ1PyBjinPB4NoL-aXT9Wzl8nc",
  authDomain: "bordo-news.firebaseapp.com",
  projectId: "bordo-news",
  storageBucket: "bordo-news.appspot.com",
  messagingSenderId: "1014153887038",
  appId: "1:1014153887038:web:5b6065a724adcf467d406f",
  measurementId: "G-R4QZBTLQZC"
};

const firebaseApp = initializeApp(firebaseConfig);