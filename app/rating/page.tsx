"use client";
import { useEffect, useState } from "react";
import RatingColumns from "./rating-column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { RestRating, RestSubmit } from "./types";
import { generateData, getRestaurants, submitRatings } from "./infra";
import { UserAuth } from "../auth/authContext";
import { serverTimestamp } from "@firebase/firestore";
import { redirect } from "next/navigation";

const RatingPage = () => {
  const [restaurantsLeft, setRestaurantsLeft] = useState<RestRating[]>([]);
  const [restaurantsRight, setRestaurantsRight] = useState<RestRating[]>([]);
  const { user } = UserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    generateData().then(() => {});
    getRestaurants()
      .then((restaurants) => {
        // setRestaurantsLeft(restaurants);
        setRestaurantsRight(restaurants.slice(0, 10));
      })
      .catch((_) => {
        console.log("error fetching data");
      });
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      redirect("/home");
    }
  }, [isSubmitted]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    //sort left
    const leftIds = Array.from(restaurantsLeft);
    const rightIds = Array.from(restaurantsRight);
    if (source.droppableId == destination.droppableId) {
      if (source.droppableId == "restaurants-left") {
        const movedRestaurant = leftIds.splice(source.index, 1);
        leftIds.splice(destination.index, 0, movedRestaurant[0]);
        setRestaurantsLeft(leftIds);
      } else {
        const movedRestaurant = rightIds.splice(source.index, 1);
        rightIds.splice(destination.index, 0, movedRestaurant[0]);
        setRestaurantsRight(rightIds);
      }
    } else {
      if (source.droppableId == "restaurants-left") {
        if (rightIds.length != 10) {
          const movedRestaurant = leftIds.splice(source.index, 1);
          rightIds.splice(destination.index, 0, movedRestaurant[0]);
          setRestaurantsLeft(leftIds);
          setRestaurantsRight(rightIds);
        }
      } else {
        const movedRestaurant = rightIds.splice(source.index, 1);
        leftIds.splice(destination.index, 0, movedRestaurant[0]);
        setRestaurantsLeft(leftIds);
        setRestaurantsRight(rightIds);
      }
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await submitRatings(
      restaurantsRight.map(
        (r, i): RestSubmit => ({
          id: r.id,
          rating: 10 - i,
          userId: user!.uid,
          userName: user?.displayName ?? "",
          createdTimestamp: serverTimestamp(),
        })
      )
    );
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RatingColumns
        restaurantsLeft={restaurantsLeft}
        restaurantsRight={restaurantsRight}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </DragDropContext>
  );
};

export default RatingPage;
