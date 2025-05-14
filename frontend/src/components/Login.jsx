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
          className="w-32 h-32 rounded-full border"
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
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded">
        Login with Google
      </button>
    </div>
  );
}