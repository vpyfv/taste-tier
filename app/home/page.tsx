"use client";

import { useEffect, useState } from "react";
import RatingCard from "../../components/ratingcard/ratingcard";
import { Restaurant, getRestaurantsDataStream } from "./infra";
import { generateData } from "../mock/generate";
import { UserAuth } from "../auth/authContext";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { user } = UserAuth();
  useEffect(() => {
    generateData().then(() => {});

    const unsubscribe = getRestaurantsDataStream((data) => {
      setRestaurants(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="flex items-center h-screen">
      <div className="w-1/3 text-text-color-p">
        <div className="text-5xl font-bold mb-6">People of columbia chose their favorite restaurants</div>
        <div className="text-end ">
          <span className="font-semibold drop-shadow-xl">{user != null ? "Rate" : "Sign in"}</span> your favorite
          restaurant
        </div>
      </div>
      <div className="w-3/4 mt-40 ml-20 h-4/5 overflow-y-scroll relative last:mb-20">
        {restaurants.map((res, i) => (
          <RatingCard key={i} restaurant={res} index={i}></RatingCard>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
