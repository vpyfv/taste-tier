"use client";
import { redirect, useRouter } from "next/navigation";
import { getUserDetails } from "../infra";
import { useEffect, useState } from "react";
import { UserDetail } from "../types";
import { updateUserProfile } from "./infra";

const ProfileUpdatePage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetail>();
  useEffect(() => {
    getUserDetails(id).then((userDetail) => {
      setUserDetails(userDetail);
    });
  }, [id]);

  const updateUser = async (formData: FormData) => {
    await updateUserProfile(userDetails ?? null, {
      bio: formData.get("bio")?.toString(),
      name: formData.get("name")?.toString(),
      pic: formData.get("image")?.toString(),
    });
    router.back();
  };

  return (
    <form action={updateUser}>
      <div className="flex justify-center h-screen items-center text-text-color-p flex-col">
        <div className="mt-8 w-1/3">
          <div className="grid grid-cols-1 gap-6">
            <label className="text-center text-2xl font-semibold">Update Profile Details</label>
            <label className="block">
              <span>Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md bg-card border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 focus:text-text-color-s"
                placeholder={userDetails?.name}
                name="name"
              />
            </label>
            <label className="block">
              <span>Profile Pic Url</span>
              <input
                type="url"
                className="mt-1 block w-full rounded-md bg-card border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 focus:text-text-color-s"
                placeholder={userDetails?.pic}
                name="image"
              />
            </label>
            <label className="block">
              <span>Bio</span>
              <textarea
                className="mt-1 block w-full rounded-md bg-card border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 rows=5 focus:text-text-color-s h-40"
                placeholder={userDetails?.bio}
                name="bio"
              ></textarea>
            </label>
            <button className="bg-white w-min mx-auto px-4 py-2 rounded-lg text-text-color-s" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ProfileUpdatePage;
