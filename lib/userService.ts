import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

export interface UserData {
  basic: {
    name: string;
    role: "founder" | "msme" | "investor" | "salaried" | "government" | "student" | "freelancer";
    experienceLevel: "beginner" | "intermediate" | "advanced";
    primaryGoals: string[];
  };
  workContext: {
    industry?: string;
    businessType?: string;
    subSector?: string;
    employmentType?: string;
    department?: string;
    investmentTypes?: string[];
    fieldOfStudy?: string;
  };
  location: {
    country: string;
    state: string;
    city?: string;
  };
  financial: {
    revenueRange?: string;
    incomeRange?: string;
    portfolioSize?: string;
    registrations?: string[];
    teamSize?: string;
  };
  preferences: {
    riskPreference?: string;
    timeSensitivity?: string;
    decisionStyle?: string;
    knowledgeLevel?: string;
    language?: string;
    interests?: string[];
  };
  system: {
    onboardingCompleted: boolean;
    createdAt: any;
    updatedAt: any;
  };
}

export const getUserDoc = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data() as UserData, error: null };
    }
    return { data: null, error: "No user found" };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const createOrUpdateUserDoc = async (uid: string, data: Partial<UserData>) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // First time initialization
      const initialData = {
        ...data,
        system: {
          onboardingCompleted: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          ...data.system
        }
      };
      await setDoc(docRef, initialData);
    } else {
      // Merge updates
      await setDoc(docRef, {
        ...data,
        system: {
          ...docSnap.data().system,
          ...data.system,
          updatedAt: serverTimestamp()
        }
      }, { merge: true });
    }
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const completeOnboarding = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      "system.onboardingCompleted": true,
      "system.updatedAt": serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
