import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function loginWithGoogle(): Promise<void> {
  try {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });
    await signInWithPopup(auth, provider);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("popup-closed-by-user")) return;
      throw new Error(error.message);
    }
  }
}

//log out

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Logout failed");
  }
}
