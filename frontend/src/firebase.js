import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
   apiKey: "AIzaSyCMuH8p5X3M6W3YE1KAAdo1Y6feqc6S9eY",
  authDomain: "medicine-app-c076d.firebaseapp.com",
  projectId: "medicine-app-c076d",
  storageBucket: "medicine-app-c076d.firebasestorage.app",
  messagingSenderId: "1088166645060",
  appId: "1:1088166645060:web:ecabcf4fcf508a3835db11",
  measurementId: "G-NP2KMC2JC2"
  
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage,};
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BKcXwEyF1keeo2pAcVlU3hPQ1vQ1hMnjorPR8HkGu4Th24PuG0-QrDX0MEhUHKXjZ5PEV1SgDPHfbdQaB8yqZEk"
});

      console.log("✅ FCM Token:", token);
      localStorage.setItem("fcmToken", token);

    } else {
      console.log("❌ Notification permission denied");
    }

  } catch (err) {
    console.log("❌ Token error:", err);
  }
};
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);

  alert(payload.notification.title + " - " + payload.notification.body);
});