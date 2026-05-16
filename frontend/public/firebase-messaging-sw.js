importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCMuH8p5X3M6W3YE1KAAdo1Y6feqc6S9eY",
  authDomain: "medicine-app-c076d.firebaseapp.com",
  projectId: "medicine-app-c076d",
  storageBucket: "medicine-app-c076d.firebasestorage.app",
  messagingSenderId: "1088166645060",
  appId: "1:1088166645060:web:ecabcf4fcf508a3835db11",
  measurementId: "G-NP2KMC2JC2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});