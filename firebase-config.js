/*
 * Firebase Web App configuration.
 * These values identify your Firebase project; they are not server secrets.
 * Keep Firestore and Storage Security Rules enabled. Never put service-account
 * JSON, private keys, or admin passwords in this file.
 */
window.KARAAGE_FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  /*
   * Leave this empty to use Firestore/Auth only on Spark.
   * To enable visitor image/video uploads, enable Blaze billing, create the
   * default Storage bucket, then copy its exact bucket name here, commonly:
   * YOUR_PROJECT_ID.firebasestorage.app
   */
  storageBucket: "",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

/* Public UI hint only. The real admin restriction is in firestore.rules. */
window.KARAAGE_ADMIN_UID = "U3lXzDRwojVXffXlhmeMTrMDciE3";
