export type RestDetail = {
  name: string;
  image: string;
  address: string;
  location: string;
  timings: string[];
  avgScore: number;
  ratingCount: number;
  userRatings: RestUserRatingDetail[];
  recentUsers: RestRatedUser[];
};

export type RestUserRatingDetail = {
  userCount: number;
  rating: number;
};

export type RestRatedUser = {
  name: string;
  rating: number;
  userId: string;
};
