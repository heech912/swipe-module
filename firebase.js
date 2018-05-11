import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCliNjm1f48J_MLWUJwCFlnF5saQOac_y0",
    authDomain: "swipe-module.firebaseapp.com",
    databaseURL: "https://swipe-module.firebaseio.com",
    projectId: "swipe-module",
    storageBucket: "swipe-module.appspot.com",
    messagingSenderId: "458915151632"
};

firebase.initializeApp(config);

export const db = firebase.database();
