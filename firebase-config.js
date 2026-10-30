/*
 * Firebase Web App configuration.
 * These values identify your Firebase project; they are not server secrets.
 * Keep Firestore and Storage Security Rules enabled. Never put service-account
 * JSON, private keys, or admin passwords in this file.
 */
window.KARAAGE_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBlI-3UJBvYo9FVPAsycXyyaVNtbHCJLFE",
  authDomain: "karaage-vmechanics.firebaseapp.com",
  projectId: "karaage-vmechanics",
  /*
   * Leave this empty to use Firestore/Auth only on Spark.
   * To enable visitor image/video uploads, enable Blaze billing, create the
   * default Storage bucket, then copy its exact bucket name here, commonly:
   * YOUR_PROJECT_ID.firebasestorage.app
   */
  storageBucket: "karaage-vmechanics.firebasestorage.app",
  messagingSenderId: "970062988622",
  appId: "1:970062988622:web:7b09d38359ea783ea54a1f"
  measurementId: "G-FF9V7E5NRF"
};

/* Public UI hint only. The real admin restriction is in firestore.rules. */
window.KARAAGE_ADMIN_UID = "U3lXzDRwojVXffXlhmeMTrMDciE3";
