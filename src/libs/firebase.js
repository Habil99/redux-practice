import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD753PeAeGDzR1BfOTSFrwuO1CrpL4eEKs",
  authDomain: "simple-template-675a3.firebaseapp.com",
  databaseURL: "https://simple-template-675a3.firebaseio.com",
  projectId: "simple-template-675a3",
  storageBucket: "simple-template-675a3.appspot.com",
  messagingSenderId: "912508833956",
  appId: "1:912508833956:web:8296e34d3083d171d55631",
  measurementId: "G-WNZ26649XB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }

export default db