import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { FirebaseDB } from "../server/firebase";
import { RestRating, RestSubmit } from "./types";
import { randomUUID } from "crypto";

//get restaurants
export const getRestaurants = async (): Promise<RestRating[]> => {
  const restRef = collection(FirebaseDB, "restaurant");
  const q = query(restRef);
  const querySnapshot = await getDocs(q);
  let restaurants: RestRating[] = [];
  querySnapshot.forEach((doc) => {
    restaurants.push({ id: doc.id, name: doc.data().name });
  });
  return restaurants;
};

//submit rating to the restaurant

export const submitRatings = async (ratings: RestSubmit[]) => {
  ratings.map(async (rating) => {
    const restRatingDoc = {
      user_id: rating.userId,
      user_name: rating.userName,
      rated_time: rating.createdTimestamp,
      rating: rating.rating,
    };
    console.log("calling insert");
    await setDoc(doc(FirebaseDB, "restaurant", rating.id, "users", rating.userId), restRatingDoc);
  });
};
