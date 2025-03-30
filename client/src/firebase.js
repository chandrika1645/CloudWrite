import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDi_sOrxXaTvt5in8ZcqVDT_aviEtgRa6Q",
  authDomain: "cloud-write.firebaseapp.com",
  projectId: "cloud-write",
  storageBucket: "cloud-write.firebasestorage.app",
  messagingSenderId: "640466787246",
  appId: "1:640466787246:web:c9a46685a0f47d10b3463f",
  measurementId: "G-R4KSLVDBDG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/drive.file");
provider.setCustomParameters({
  prompt: "consent",
  access_type: "offline",
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const token = await user.getIdToken();

    const credential = GoogleAuthProvider.credentialFromResult(result);

    console.log("cred", credential);
    const googleOAuthToken = credential.accessToken;

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      token,
      googleOAuthToken,
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    alert(`Sign-in failed: ${error.message}`);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

export { auth, provider };
