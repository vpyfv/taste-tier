import Link from "next/link";
import { Restaurant } from "../../app/home/infra";
import RatingLength from "./ratingLegth";

const RatingCard = (params: { restaurant: Restaurant }) => {
  return (
    <div className="flex items-center">
      <Link
        className="bg-card m-3 p-3 rounded-2xl w-full shadow-md text-text-color-p hover:bg-text-color-p hover:text-text-color-s hover:shadow-2xl"
        href={`/restaurant/${params.restaurant.id}`}
      >
        <div className="flex justify-between text-xl">
          <div>{params.restaurant.name}</div>
          <div className="flex items-center">
            <p>{params.restaurant.ratingCount}</p>
            <p className="ml-2 font-light text-xs ">ratings</p>
          </div>
        </div>
        <RatingLength length={params.restaurant.avgScore} ratingColor="bg-background" />
      </Link>
      <div className="ml-3 mr-3 font-semibold text-text-color-p text-xl">{params.restaurant.avgScore}</div>
    </div>
  );
};
export default RatingCard;
