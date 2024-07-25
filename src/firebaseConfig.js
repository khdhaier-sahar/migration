import firebase from 'firebase/app';
import 'firebase/messaging';

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDbaHYv99zEOM2tYlFrTbBenI9yTKiLLrw",
    authDomain: "auzy-aa536.firebaseapp.com",
    databaseURL: "https://auzy-aa536-default-rtdb.firebaseio.com",
    projectId: "auzy-aa536",
    storageBucket: "auzy-aa536.appspot.com",
    messagingSenderId: "124017373158",
    appId: "1:124017373158:web:90445673f8e2af0e19b027"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

export { messaging };
