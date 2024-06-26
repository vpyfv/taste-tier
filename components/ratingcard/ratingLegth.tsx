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
  if (length == 1) {
    return "w-10";
  }
  return "w-0";
};

const RatingLength = ({ length, ratingColor = "bg-background" }: { length: number; ratingColor: string }) => {
  return <div className={`h-5 ${ratingColor} ${ratingLengthCss(length)} rounded-full mt-4 mb-2`}></div>;
};
export default RatingLength;
