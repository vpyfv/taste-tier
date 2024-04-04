import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import { FirebaseDB } from "../../server/firebase";

export const createUserIfNotExists = async (userId: string, userName: string | null) => {
  console.log("creating user");
  const userRef = doc(FirebaseDB, "user", userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await setDoc(userRef, {
      bio: "",
      created_time: serverTimestamp(),
      profile_pic: "",
      user_name: userName,
    });
  }
};
