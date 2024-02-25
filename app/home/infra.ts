import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import db from "../server/db/firestore";

export type Restaurant = {
  id: string;
  name: string;
  score: number;
  userCount: number;
};

export function getRestaurantsDataStream(cb: (restaurants: Restaurant[]) => void) {
  const unsubscribe = onSnapshot(query(collection(db, "restaurant")), (querySnapshot) => {
    const result = querySnapshot.docs.map((d) => {
      console.log("calling");
      return {
        id: d.id,
        name: d.data().name,
        score: d.data().score,
        userCount: d.data().users,
      };
    });
    cb(result);
  });
  return unsubscribe;
}
