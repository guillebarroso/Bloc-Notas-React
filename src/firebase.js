import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhgtost2a8vH6McGWdae1stQuSzo9Lae4",
    authDomain: "fir-cliente-d7cf2.firebaseapp.com",
    projectId: "fir-cliente-d7cf2",
    storageBucket: "fir-cliente-d7cf2.appspot.com",
    messagingSenderId: "160529767614",
    appId: "1:160529767614:web:3fbadaf4d0d4029e8d92ef"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db, auth, firebase}