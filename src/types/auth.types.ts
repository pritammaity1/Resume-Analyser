import type { User } from "firebase/auth";

// Firebase user object
export type AuthUser = User;

//Global Auth State
export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

// Google login function type

export type LoginWithGoogle = () => Promise<void>;

// logout function

export type Logout = () => Promise<void>;
