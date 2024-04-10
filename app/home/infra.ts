import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { FirebaseDB } from "../server/firebase";

export type Restaurant = {
  id: string;
  name: string;
  avgScore: number;
  ratingCount: number;
};

export function getRestaurantsDataStream(cb: (restaurants: Restaurant[]) => void) {
  const restaurantRef = collection(FirebaseDB, "restaurant");
  const q = query(restaurantRef);
  const unsubscribe = onSnapshot(query(q), (querySnapshot) => {
    const restaurants = querySnapshot.docs.map((d) => d);

    const globalAverageRating: number =
      restaurants.reduce((acc, curr) => acc + curr.data().avg_score, 0) / querySnapshot.docs.length;
    const m: number = 2;

    function weightedRating(
      restaurant: QueryDocumentSnapshot<DocumentData, DocumentData>,
      m: number,
      C: number
    ): number {
      const v: number = restaurant.data().rating_count;
      const R: number = restaurant.data().avg_score;
      return (v / (v + m)) * R + (m / (m + v)) * C;
    }

    restaurants.sort((a, b) => weightedRating(b, m, globalAverageRating) - weightedRating(a, m, globalAverageRating));

    const result = restaurants.slice(0, 10).map((d) => {
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
