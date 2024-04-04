import { doc, getDoc } from "@firebase/firestore";
import { FirebaseDB } from "../../server/firebase";
import { UserDetail } from "./types";

export const getUserDetails = async (userId: string): Promise<UserDetail> => {
  const docRef = doc(FirebaseDB, "user", userId);
  const userDoc = await getDoc(docRef);
  const data = userDoc.data();
  const daysAgo = calculateDaysDifferenceFromTimestamp(data!.created_time!.seconds);
  return {
    bio: data!.bio,
    daysAgo: daysAgo,
    userId: userDoc.id,
    name: data!.user_name,
    pic: data!.profile_pic,
  };
};

const calculateDaysDifferenceFromTimestamp = (timestampSeconds: number): number => {
  const dateFromTimestamp = new Date(timestampSeconds * 1000);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - dateFromTimestamp.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(differenceInDays);
};
