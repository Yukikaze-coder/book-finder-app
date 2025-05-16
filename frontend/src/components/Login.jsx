import { useState, useEffect } from "react";
import { auth, googleProvider, loginUser, registerUser } from "../firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "/default-avatar.jpg"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailLogin = async () => {
    try {
      await loginUser(email, password);
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEmailSignup = async () => {
    try {
      await registerUser(email, password);
      toast.success("Account created and logged in");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out");
  };

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto text-center">
        <img
          src={
            user.providerData[0]?.providerId === "password"
              ? DEFAULT_AVATAR
              : user.photoURL
          }
          alt="avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <p className="font-bold">{user.displayName || user.email}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="bg-gray-400 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto text-center">
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2 justify-center">
        <button onClick={handleEmailLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
        <button onClick={handleEmailSignup} className="bg-green-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </div>
      <hr className="my-2" />
      <button className="gsi-material-button" onClick={handleGoogleLogin} type="button">
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: "block" }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">Sign in with Google</span>
          <span style={{ display: "none" }}>Sign in with Google</span>
        </div>
      </button>
    </div>
  );
}