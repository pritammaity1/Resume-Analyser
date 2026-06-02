import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { toFirebasePayload } from "@/types";
import type {
  SavedAnalysis,
  NewAnalysisPayload,
  AnalysisResult,
} from "@/types";

//saved analysis
export async function saveAnalysis(
  result: AnalysisResult,
  userId: string,
): Promise<string> {
  try {
    const payload: NewAnalysisPayload = toFirebasePayload(result, userId);
    const ref = await addDoc(collection(db, "analysis"), payload);
    return ref.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to sava analysis");
  }
}
// getting all analysis

export async function getUserAnalysis(
  userId: string,
): Promise<SavedAnalysis[]> {
  try {
    const q = query(collection(db, "analysis"), where("userId", "==", userId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as SavedAnalysis,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to load Analysis");
  }
}

// delete one analysis

export async function deleteAnalysis(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "analysis", id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete analysis");
  }
}
