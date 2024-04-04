"use client";
import Image from "next/image";
import { UserDetail } from "./types";
import { useEffect, useState } from "react";
import { getUserDetails } from "./infra";
import { UserAuth } from "../../auth/authContext";
import Link from "next/link";

const UserPage = ({ params: { id } }: { params: { id: string } }) => {
  const [userDetails, setUserDetails] = useState<UserDetail>();
  const { user } = UserAuth();

  useEffect(() => {
    getUserDetails(id)
      .then((data) => {
        setUserDetails(data);
      })
      .catch((_) => console.log("error getting data"));
  }, [id]);

  return (
    <div className="flex  items-center h-screen justify-start text-text-color-p">
      {userDetails != undefined ? (
        <>
          <div className="mr-40 ml-40">
            <div className="flex flex-col items-center">
              <Image src={userDetails.pic} alt="" width={350} height={350} className="shadow rounded-3xl"></Image>
              <h1 className="text-xl font-semibold mt-4 text-center">{userDetails.name}</h1>
              <p className="self-end text-sm font-light mt-4">
                created: {userDetails.daysAgo == 0 ? "today" : userDetails.daysAgo + " days "}
              </p>
              {user != null && user.uid == id ? (
                <Link
                  href={`/user/${id}/update`}
                  className="px-4 py-2 my-4 bg-card rounded-xl hover:bg-text-color-p hover:text-text-color-s hover:shadow-2xl"
                >
                  Edit profile
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-2/3">
            <h1 className="text-3xl font-semibold">Bio</h1>
            <p className="ml-4">{userDetails.bio}</p>
          </div>
        </>
      ) : (
        <p>User Not Exists</p>
      )}
    </div>
  );
};
export default UserPage;
