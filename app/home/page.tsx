"use client";

import { useEffect, useState } from "react";
import RatingCard from "../../components/ratingcard/ratingcard";
import { Restaurant, getRestaurantsDataStream } from "./infra";
import { generateData } from "../mock/generate";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
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
        <div className="text-end ">it wont be same if you disagree</div>
        <div className="text-end mt-4 ">Rate Now</div>
      </div>
      <div className="w-3/4 mt-40 ml-20 h-4/5 overflow-y-scroll relative">
        {restaurants.map((res, i) => (
          <RatingCard key={i} restaurant={res}></RatingCard>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
