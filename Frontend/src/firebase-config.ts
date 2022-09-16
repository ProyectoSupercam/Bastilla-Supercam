
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth, signInWithRedirect,signInWithCredential, getRedirectResult} from "firebase/auth";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDocOUxFQAxtCDxAtfGgzxAyVrrVAX25vw",
  authDomain: "aplicacionbastilla.firebaseapp.com",
  projectId: "aplicacionbastilla",
  storageBucket: "aplicacionbastilla.appspot.com",
  messagingSenderId: "96797717558",
  appId: "1:96797717558:web:0f5cae9be65b9ce1e15497",
  measurementId: "G-0HB6LQ4L92"
};

// Initialize Firebase
// const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const bd = getFirestore(app);

//authenticate

// let auth = getAuth();
// signInWithRedirect(auth, provider);
// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     if(result != null){
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const user = result.user;
//       if (credential != null){
//         const token = credential.accessToken;
//       }else{
//         console.log(credential)
//       }
//     }else{
//       console.info(result)
//     }
//     // The signed-in user info.

//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   }) 

