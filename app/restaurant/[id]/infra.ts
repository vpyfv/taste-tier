import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "@firebase/firestore";
import { FirebaseDB } from "../../server/firebase";
import { RestDetail, RestRatedUser, RestUserRatingDetail } from "./types";

export const getRestaurantDetails = async (restId: string): Promise<RestDetail> => {
  const restRef = doc(FirebaseDB, "restaurant", restId);
  const restDoc = await getDoc(restRef);
  const restData = restDoc.data();
  const userRatingCounts: RestUserRatingDetail[] = (restData!.user_ratings as [])
    .map((data, i): RestUserRatingDetail => ({ rating: i + 1, userCount: data }))
    .reverse();
  const ratedUsers = await getLatestRatedUsers(restId, 5);

  const restDetail: RestDetail = {
    address: restData!.address,
    image: restData!.image,
    location: restData!.location,
    name: restData!.name,
    avgScore: restData!.avg_score,
    ratingCount: restData!.rating_count,
    userRatings: userRatingCounts,
    timings: restData!.timings,
    recentUsers: ratedUsers,
  };
  console.log(restDetail);
  return restDetail;
};

const getLatestRatedUsers = async (restId: string, howMany: number): Promise<RestRatedUser[]> => {
  const restUserRef = collection(FirebaseDB, "restaurant", restId, "users");
  const q = query(restUserRef, orderBy("rated_time", "desc"), limit(5));
  const restUserDocs = await getDocs(q);
  const ratedUsers = restUserDocs.docs.map(
    (doc): RestRatedUser => ({ name: doc.data()!.user_name, rating: doc.data()!.rating, userId: doc.id })
  );
  return ratedUsers;
};
