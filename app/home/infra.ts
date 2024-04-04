import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { FirebaseDB } from "../server/firebase";

export type Restaurant = {
  id: string;
  name: string;
  avgScore: number;
  ratingCount: number;
};

export function getRestaurantsDataStream(cb: (restaurants: Restaurant[]) => void) {
  const restaurantRef = collection(FirebaseDB, "restaurant");
  const q = query(restaurantRef, orderBy("avg_score", "desc"), orderBy("rating_count", "desc"), limit(10));
  const unsubscribe = onSnapshot(query(q), (querySnapshot) => {
    const result = querySnapshot.docs.map((d) => {
      return {
        id: d.id,
        name: d.data().name,
        avgScore: d.data().avg_score,
        ratingCount: d.data().rating_count,
      };
    });
    cb(result);
  });
  return unsubscribe;
}
