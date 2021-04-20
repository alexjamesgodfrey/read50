import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

var google = new firebase.auth.GoogleAuthProvider();
var github = new firebase.auth.GithubAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
});

export const googleProvider = google;
export const githubProvider = github;
export const facebookProvider = facebook;
export const auth = app.auth();
export default app;