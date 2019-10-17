import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB8UpLjIYPmAhGlw7PECxgvHvZMTfnUSVU",
    authDomain: "faahtree.firebaseapp.com",
    databaseURL: "https://faahtree.firebaseio.com",
    projectId: "faahtree",
    storageBucket: "",
    messagingSenderId: "525774446429",
    appId: "1:525774446429:web:69fcd538914c82ec"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ });

export default firebase;