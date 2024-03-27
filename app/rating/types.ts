import firebase from "firebase/compat/app";

export type RestRating = {
  id: string;
  name: string;
};

export type RestSubmit = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  createdTimestamp: firebase.firestore.FieldValue;
};
