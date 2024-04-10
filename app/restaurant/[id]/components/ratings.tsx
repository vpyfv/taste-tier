import RatingLength from "../../../../components/ratingcard/ratingLegth";
import { RestUserRatingDetail } from "../types";

const Ratings = ({ userRatings }: { userRatings: RestUserRatingDetail[] }) => {
  const totalRatings = userRatings.reduce((sum, current) => sum + current.userCount, 0);
  return userRatings.map((userRating, i) =>
    userRating.userCount != 0 ? (
      <div key={i} className="flex items-center space-x-6">
        <p className="mr-6">{userRating.rating}</p>
        <div className="w-1/2">
          <RatingLength length={Math.floor((userRating.userCount * 10) / totalRatings)} ratingColor="bg-card" />
        </div>
        <p>
          {userRating.userCount}
          <span className="text-xs font-extralight">{userRating.userCount == 1 ? "  user" : "  users"}</span>
        </p>
      </div>
    ) : (
      <div key={i}></div>
    )
  );
};
export default Ratings;
