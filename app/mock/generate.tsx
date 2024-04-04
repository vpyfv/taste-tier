import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { FirebaseDB } from "../server/firebase";
import { v4 as uuidv4 } from "uuid";

export const generateData = async () => {
  const restIds = [...Array(20)].map((_, __) => uuidv4());
  const userIds = [...Array(10)].map((_, __) => uuidv4());
  const usersCreated = await createUsers(userIds);
  const restCreated = await createRestaurants(restIds);
  if (usersCreated && restCreated) {
    await addUsersRatingsToRestaurants(restIds, userIds);
  }
};

const createUsers = async (userIds: string[]): Promise<boolean> => {
  const userRef = collection(FirebaseDB, "user");
  const q = query(userRef, limit(1));
  const docs = await getDocs(q);
  if (docs.docs.length == 0) {
    userIds.forEach(async (userId, i) => {
      await setDoc(doc(FirebaseDB, "user", userId), {
        profile_pic: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
        created_time: serverTimestamp(),
        bio: "Lorem ipsum dolor sit amet consectetur. Cras tincidunt hac duis sit faucibus duis. Est lobortis sed a turpis placerat luctus enim sit pulvinar. Dolor nunc et mauris sapien fermentum a sed. Quam tellus ametpharetra eget vehicula maecenas nisi. Imperdiet leo amet non ut pellentesque consectetur metus eratnascetur. Adipiscing imperdiet ac tincidunt ipsum vel ipsum non massa. Nisi mi sed proin fringilla acadipiscing. Sapien eu donec quis orci aliquam. Volutpat purus quis lacus varius eu iaculis risus. Dolorlectus facilisi dignissim eu. Amet consectetur urna egestas in viverra. Accumsan donec odio nulla",
        user_name: userId,
      });
    });
    return true;
  }
  return false;
};

const createRestaurants = async (restIds: string[]): Promise<boolean> => {
  const restRef = collection(FirebaseDB, "restaurant");
  const q = query(restRef, limit(1));
  const docs = await getDocs(q);
  if (docs.docs.length == 0) {
    restIds.forEach(async (restId, i) => {
      await setDoc(doc(FirebaseDB, "restaurant", restId), {
        name: "rest" + i,
        avg_score: 0,
        rating_count: 0,
        user_ratings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        address: "some address",
        timings: "9AM-10PM",
        location: "https://maps.app.goo.gl/2rXgz7VyC8a9P53U8",
        image:
          "https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
    });
    return true;
  }
  return false;
};

const addUsersRatingsToRestaurants = async (restIds: string[], userIds: string[]) => {
  for (const userId of userIds) {
    console.log("updating rating for user:" + userId);
    // const shuffledRestIds = restIds.sort(() => 0.5 * Math.random());
    const randomRestIds = pickRandomElements(restIds, 10);
    for (const restId of randomRestIds) {
      console.log("updating rating for restaurant:" + restId);
      const newRating = Math.floor(Math.random() * 10) + 1;
      const restUserRatingDoc = {
        user_name: userId,
        rated_time: serverTimestamp(),
        rating: newRating,
      };
      const existingUserDocRef = doc(FirebaseDB, "restaurant", restId, "users", userId);

      const existingRestDocRef = doc(FirebaseDB, "restaurant", restId);
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
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice(); // Clone the array to avoid modifying the original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
}

function pickRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}
