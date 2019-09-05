import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
// Initialize Firebase
/*var config = {
  apiKey: "AIzaSyA2xIBsbkZnBQCJTseZZ5KljsOCU282jSU",
  authDomain: "i-spd-6407d.firebaseapp.com",
  //authDomain: "cantarranas.es",
  databaseURL: "https://i-spd-6407d.firebaseio.com",
  projectId: "i-spd-6407d",
  storageBucket: "i-spd-6407d.appspot.com",
  messagingSenderId: "867157317361"
};*/

const config = {
  apiKey: "AIzaSyDzoJXrKpS7W6AukualaR37c9Xy51VLpiY",
  authDomain: "hielos-ribera-manchega.firebaseapp.com",
  databaseURL: "https://hielos-ribera-manchega.firebaseio.com",
  projectId: "hielos-ribera-manchega",
  storageBucket: "",
  messagingSenderId: "869522023036",
  appId: "1:869522023036:web:2988d4dd2e209068"
};

//FirebaseDatabase.getInstance().setPersistenceEnabled(true);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default context => {
  const { store } = context;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      store.commit("setUser", user);
      resolve();
    });
  });
};
