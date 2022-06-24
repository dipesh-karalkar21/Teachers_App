import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyABwayDz4kwRc4NeL04U4cBLJG9YS7heo4",
  authDomain: "teachersapp-2138f.firebaseapp.com",
  databaseURL: "https://teachersapp-2138f-default-rtdb.firebaseio.com",
  projectId: "teachersapp-2138f",
  storageBucket: "teachersapp-2138f.appspot.com",
  messagingSenderId: "243247584669",
  appId: "1:243247584669:web:80333e52e61af632ad8b74"
};
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();