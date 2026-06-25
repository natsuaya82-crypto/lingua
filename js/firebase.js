import{initializeApp}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import{getAuth,onAuthStateChanged,signInWithRedirect,getRedirectResult,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,GoogleAuthProvider}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import{getFirestore,doc,setDoc,getDoc,addDoc,collection}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
const FB_CFG={apiKey:"AIzaSyBsrxUHZCsfMJvlQ-rgLemmw8anvkp7tGw",authDomain:"lingua-17cd3.firebaseapp.com",projectId:"lingua-17cd3",storageBucket:"lingua-17cd3.appspot.com",messagingSenderId:"123456789",appId:"1:123456789:web:abcdef"};
const app=initializeApp(FB_CFG);
const auth=getAuth(app);const db=getFirestore(app);
window.FB={auth,db,onAuthStateChanged,signInWithRedirect,getRedirectResult,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,GoogleAuthProvider,doc,setDoc,getDoc,addDoc,collection};
console.log('[Firebase] ready');
