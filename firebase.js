import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD2oDpOyTjWpQ6DGaejXfZyXgieiEBFOUQ",
  authDomain: "medicalappshovalohad.firebaseapp.com",
  projectId: "medicalappshovalohad",
  storageBucket: "medicalappshovalohad.appspot.com",
  messagingSenderId: "1048119374954",
  appId: "1:1048119374954:web:caad5648aefb1edf50c613",
  measurementId: "G-RW6H67HL4E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



