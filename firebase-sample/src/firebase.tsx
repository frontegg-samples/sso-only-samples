import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, inMemoryPersistence } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyCNCLmqDPW8nQwiu2IiDsMnNVR5wLXxkl0',
    authDomain: 'test-frontegg-integration.firebaseapp.com',
    projectId: 'test-frontegg-integration',
    storageBucket: 'test-frontegg-integration.appspot.com',
    messagingSenderId: '397043190502',
    appId: '1:397043190502:web:73270761e83a7310594927',
    measurementId: 'G-T2PL3XTBPP'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
auth.setPersistence(inMemoryPersistence);
export const googleProvider = new GoogleAuthProvider();
