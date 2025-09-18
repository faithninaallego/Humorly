// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAzu1HktKVl2gtgbjEJDwJyC6L4hk0KCI",
  authDomain: "humorly-78993.firebaseapp.com",
  projectId: "humorly-78993",
  storageBucket: "humorly-78993.appspot.com", // ✅ fixed
  messagingSenderId: "376740947428",
  appId: "1:376740947428:web:88d2aa359f4d9fa91293f1"
};

const app = initializeApp(firebaseConfig);

// prevent re-init on hot reload
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
