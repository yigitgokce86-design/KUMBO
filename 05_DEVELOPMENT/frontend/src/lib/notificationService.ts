import { getToken, onMessage } from "firebase/messaging";
import { auth, db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

// Note: This requires a service worker (firebase-messaging-sw.js) and actual FCM keys.
// This is a simulated service for the Venture Builder demonstration.

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("Notification permission granted.");

            // In a real app, you would get the FCM token here:
            // const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });

            const mockToken = "fcm_token_" + Math.random().toString(36).substring(7);

            if (auth.currentUser) {
                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    fcmToken: mockToken
                });
            }
            return mockToken;
        }
    } catch (error) {
        console.error("Unable to get permission to notify.", error);
    }
};

export const onMessageListener = (messaging: any) =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Message received: ", payload);
            resolve(payload);
        });
    });
