"use client";
import Image from "next/image";
import Ratings from "./components/ratings";
import Users from "./components/user";
import { RestDetail } from "./types";
import { useEffect, useState } from "react";
import { getRestaurantDetails } from "./infra";
import Link from "next/link";

const RestaurantPage = ({ params: { id } }: { params: { id: string } }) => {
  const [restDetails, setRestDetails] = useState<RestDetail>();
  useEffect(() => {
    getRestaurantDetails(id)
      .then((restDetails) => {
        setRestDetails(restDetails);
      })
      .catch((error) => {
        console.log("error retrieving restaurant details:" + error);
      });
  }, [id]);

  return (
    <div className="flex justify-center text-text-color-p self-center  mt-56">
      {restDetails != undefined ? (
        <>
          <div>
            <Image src={restDetails.image} alt="" width={500} height={500} className="rounded-md shadow-lg"></Image>
            <h1 className="text-center mt-10 text-3xl">{restDetails.name}</h1>
            <div className="flex justify-between mt-5">
              <p>
                <span className="text-xl">Address: </span>
                <span className="font-light">{restDetails.address}</span>
              </p>
              <Link href={restDetails.location} rel="noopener noreferrer" target="_blank">
                Maps
              </Link>
            </div>
            <div className="h-2"></div>
            <div>
              <span className="text-xl">Timings: </span>
              <span className="font-light">{restDetails.timings}</span>
            </div>
          </div>
          <div className="w-3/4 pl-40">
            <p>ratings</p>
            <div className="max-h-60 overflow-y-scroll">
              <div>
                <Ratings userRatings={restDetails.userRatings}></Ratings>
              </div>
            </div>

            <div className="h-14"></div>
            <h1 className="text-center">Users who rated recently</h1>
            <div className="flex flex-wrap p-10">
              <Users users={restDetails.recentUsers}></Users>
            </div>
          </div>
        </>
      ) : (
        <p>no data</p>
      )}
    </div>
  );
};
export default RestaurantPage;
