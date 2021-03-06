import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAwiNkFGxJ_hgDprg60BAMic54WYBVxznA",
  authDomain: "ideas-portfolio.firebaseapp.com",
  databaseURL: "https://ideas-portfolio.firebaseio.com",
  projectId: "ideas-portfolio",
  storageBucket: "ideas-portfolio.appspot.com",
  messagingSenderId: "557201359790",
  appId: "1:557201359790:web:7c594050beb2b518603e3f",
  measurementId: "G-QMQ16GE8G2",
};

firebase.initializeApp(config);

export default firebase;
