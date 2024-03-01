import { Restaurant } from "../../app/home/infra";

const ratingLengthCss = (length: number): string => {
  if (length == 10) {
    return "w-full";
  }
  if (length == 9) {
    return "w-11/12";
  }
  if (length == 8) {
    return "w-4/5";
  }
  if (length == 7) {
    return "w-3/4";
  }
  if (length == 6) {
    return "w-3/5";
  }
  if (length == 5) {
    return "w-1/2";
  }
  if (length == 4) {
    return "w-2/5";
  }
  if (length == 3) {
    return "w-1/3";
  }
  if (length == 2) {
    return "w-1/5";
  }
  return "w-10";
};

const RatingCard = (restaurant: Restaurant) => {
  return (
    <div className="flex items-center">
      <div className="bg-card m-3 p-3 rounded-2xl w-full shadow-md hover:shadow-2xl">
        <div className="flex justify-between text-text-color-p text-xl">
          <div>{restaurant.name}</div>
          <div>{restaurant.userCount}</div>
        </div>
        <div className={`h-5 bg-background ${ratingLengthCss(restaurant.score)} rounded-full mt-4 mb-2`}></div>
      </div>
      <div className="ml-3 font-semibold text-text-color-p text-xl">{restaurant.score}</div>
    </div>
  );
};
export default RatingCard;
