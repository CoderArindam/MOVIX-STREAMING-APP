import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB3EW5g6nb51KPRezhObdsPbTsz6ZMxZzo",
  authDomain: "movix-streaming.firebaseapp.com",
  projectId: "movix-streaming",
  storageBucket: "movix-streaming.appspot.com",
  messagingSenderId: "258496320427",
  appId: "1:258496320427:web:44f7bf6538e0ab435e38ee",
  measurementId: "G-7QKH38BRES",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
export { auth, db };

