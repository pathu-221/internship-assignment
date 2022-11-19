// Import the functions you need from the SDKs you need
import { initializeApp,  } from "firebase/app";
import { getDatabase} from "firebase/database";
import 
{ getAuth,
  signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously  } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs6Uatu_nmGf5bP7ytburaNO98pC0zHQc",
  authDomain: "realtme-db-assignment.firebaseapp.com",
  databaseURL: "https://realtme-db-assignment-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtme-db-assignment",
  storageBucket: "realtme-db-assignment.appspot.com",
  messagingSenderId: "420969543109",
  appId: "1:420969543109:web:04def476531f1ab7be47ac",
  databaseURL: 'https://realtme-db-assignment-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase and set up user sign in
const provider = new GoogleAuthProvider();


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);



export const signinwithgoogle = () => {
  signInWithPopup(auth, provider)
}

export const signinanonymous = () => {
  signInAnonymously(auth);
}

export const signout = () => {

  
  signOut(auth);

}

//verify if the lobby is available or not 
