/*
 * Firebase Web App configuration.
 * These values identify your Firebase project; they are not server secrets.
 * Keep Firestore and Storage Security Rules enabled. Never put service-account
 * JSON, private keys, or admin passwords in this file.
 */
window.KARAAGE_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBlI-3UJBvYo9FVPAsycXyyaVNtbHCJLFE",
  authDomain: "karaagestand-f99d4.firebaseapp.com",
  projectId: "karaagestand-f99d4",
  /*
   * Leave this empty to use Firestore/Auth only on Spark.
   * To enable visitor image/video uploads, enable Blaze billing, create the
   * default Storage bucket, then copy its exact bucket name here, commonly:
   * YOUR_PROJECT_ID.firebasestorage.app
   */
  storageBucket: "",
  messagingSenderId: "730252884764",
  appId: "1:730252884764:web:8c6a49c7ae1d7e5e4858d9"
};

/* Public UI hint only. The real admin restriction is in firestore.rules. */
window.KARAAGE_ADMIN_UID = "sJcpa1hSjphlty6ejqGxpjrEl7o2";
