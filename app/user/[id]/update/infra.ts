import { doc, updateDoc } from "@firebase/firestore";
import { UserDetail } from "../types";
import { FirebaseDB } from "../../../server/firebase";

export const updateUserProfile = async (
  existingUserDetails: UserDetail | null,
  newUserDetails: Partial<UserDetail>
) => {
  let newDetails: any = {};
  if (existingUserDetails == null) {
    return;
  }

  newUserDetails.bio != undefined && newUserDetails.bio.length != 0
    ? newUserDetails.bio != existingUserDetails.bio
      ? (newDetails.bio = newUserDetails.bio)
      : null
    : null;

  newUserDetails.pic != undefined && newUserDetails.pic.length != 0
    ? newUserDetails.pic != existingUserDetails.pic
      ? (newDetails.profile_pic = newUserDetails.pic)
      : null
    : null;

  newUserDetails.name != undefined && newUserDetails.name.length != 0
    ? newUserDetails.name != existingUserDetails.name
      ? (newDetails.user_name = newUserDetails.name)
      : null
    : null;

  console.log("new Details" + JSON.stringify(newDetails));

  await updateDoc(doc(FirebaseDB, "user", existingUserDetails.userId), newDetails);
};
