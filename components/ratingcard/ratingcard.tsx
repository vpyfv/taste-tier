import Link from "next/link";
import { Restaurant } from "../../app/home/infra";
import RatingLength from "./ratingLegth";

const RatingCard = (params: { restaurant: Restaurant; index: number }) => {
  return (
    <div className="flex items-center">
      <Link
        className="m-3 p-3 rounded-2xl w-full text-text-color-p hover:bg-card hover:text-text-color-s border hover:drop-shadow-xl"
        href={`/restaurant/${params.restaurant.id}`}
      >
        <div className="flex justify-between text-xl">
          <div>{params.restaurant.name}</div>
          <div className="flex items-center">
            <p>{params.restaurant.ratingCount}</p>
            <p className="ml-2 font-light text-xs ">ratings</p>
          </div>
        </div>
        <div className="flex items-center">
          <RatingLength length={params.restaurant.avgScore} ratingColor="bg-card border-white border" />
          <p className="ml-2 mt-2 text-xs">{params.restaurant.avgScore}</p>
        </div>
      </Link>
      <div className="ml-3 mr-14 font-semibold text-text-color-p text-xl">{params.index + 1}</div>
    </div>
  );
};
export default RatingCard;
