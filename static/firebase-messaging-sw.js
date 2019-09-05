importScripts("https://www.gstatic.com/firebasejs/5.8.4/firebase.js");
importScripts("https://www.gstatic.com/firebasejs/5.8.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.8.4/firebase-messaging.js");

var config = {
  apiKey: "AIzaSyA2xIBsbkZnBQCJTseZZ5KljsOCU282jSU",
  authDomain: "i-spd-6407d.firebaseapp.com",
  databaseURL: "https://i-spd-6407d.firebaseio.com",
  projectId: "i-spd-6407d",
  storageBucket: "i-spd-6407d.appspot.com",
  messagingSenderId: "867157317361"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// Handle Background Notifications

var messaging = firebase.messaging();

// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notificationTitle = "Background Message Title";
  var notificationOptions = {
    body: "Background Message body"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
