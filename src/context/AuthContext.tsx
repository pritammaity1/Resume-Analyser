import React, { createContext, useContext, useState, useEffect } from "react";

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AuthUser, AuthState, LoginWithGoogle, Logout } from "@/types";

// context type

type AuthContextType = AuthState & {
  user: AuthUser | null;
  loading: boolean;
  loginWithGoogle: LoginWithGoogle;
  logout: Logout;
};

// create context

export const AuthContext = createContext<AuthContextType | null>(null);

// provider

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to firebase to login / logout automatically

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub; // cleanup listner or unsub
  }, []);

  //google login

  const loginWithGoogle: LoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider); // users State updates automatically via onAuthStateChanged
  };

  const logout: Logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//Hooks

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("UseAuth must to be inside AuthProvider");
  return ctx;
}
