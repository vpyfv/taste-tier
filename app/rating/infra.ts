import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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

export const submitRatings = async (ratings: RestSubmit[], userId: string) => {
  const user = await getDoc(doc(FirebaseDB, "user", userId));
  for (const rest of ratings) {
    console.log("updating rating for restaurant:" + rest.id);
    const newRating = rest.rating;
    const restUserRatingDoc = {
      user_name: user.data()!.user_name,
      rated_time: serverTimestamp(),
      rating: newRating,
    };
    const existingUserDocRef = doc(FirebaseDB, "restaurant", rest.id, "users", userId);
    const existingRestDocRef = doc(FirebaseDB, "restaurant", rest.id);

    const existingRestDoc = await getDoc(existingRestDocRef);

    const existingAvgScore = existingRestDoc.data()!.avg_score;
    const existingRatingCount = existingRestDoc.data()!.rating_count;
    const existingUserRatingsCount = existingRestDoc.data()!.user_ratings as [];

    console.log(JSON.stringify(existingRestDoc.data()));
    console.log({
      avg_score: existingAvgScore,
      rating_count: existingRatingCount,
      user_ratings: existingUserRatingsCount,
    });

    const existingUserDoc = await getDoc(existingUserDocRef);

    if (!existingUserDoc.exists()) {
      console.log("user not exists");
      const newRatingCount = existingRatingCount + 1;
      const newAvgRating = Math.round((existingAvgScore * existingRatingCount + newRating) / newRatingCount);
      const newUserRatings = existingUserRatingsCount.map((userRatingCount, i) =>
        i == newRating - 1 ? userRatingCount + 1 : userRatingCount
      );

      //update restaurant details
      await updateDoc(existingRestDocRef, {
        avg_score: newAvgRating,
        rating_count: newRatingCount,
        user_ratings: newUserRatings,
      });
      console.log({ avg_score: newAvgRating, rating_count: newRatingCount, user_ratings: newUserRatings });
    } else {
      console.log("user exists:" + userId);
      if (existingRatingCount != 0) {
        const existingUserRating = existingUserDoc.data()!.rating;
        const newAvgRating = Math.round(
          (existingAvgScore * existingRatingCount - existingUserRating + newRating) / existingRatingCount
        );
        const newUserRatings = existingUserRatingsCount.map((userRatingCount, i) =>
          i == existingUserRating - 1 ? userRatingCount - 1 : i == newRating ? userRatingCount + 1 : userRatingCount
        );
        await updateDoc(existingRestDocRef, {
          avg_score: newAvgRating,
          user_ratings: newUserRatings,
        });
        console.log({ avg_score: newAvgRating, rating_count: existingRatingCount });
      } else {
        await updateDoc(existingRestDocRef, {
          avg_score: newRating,
          rating_count: 1,
        });
        console.log({ avg_score: newRating, rating_count: 1 });
      }
    }
    await setDoc(existingUserDocRef, restUserRatingDoc);
  }
};
