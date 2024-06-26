"use client";
import { useEffect } from "react";
import CustomButton, { CustomButtonType } from "../../../components/button/custom-button";
import { UserAuth } from "../authContext";
import { redirect } from "next/navigation";
import { createUserIfNotExists } from "./infra";

const SignInPage = () => {
  const { user, googleSignIn } = UserAuth();
  const props: CustomButtonType = {
    text: "sign in with google",
    onclick: async () => {
      await googleSignIn();
    },
  };
  useEffect(() => {
    user != null ? createUserIfNotExists(user.uid, user.displayName).then((_) => {}) : {};
    user != null ? redirect("/home") : "";
  }, [user]);

  return (
    <div className="flex justify-center h-screen items-center">
      <CustomButton customButton={props}></CustomButton>
    </div>
  );
};
export default SignInPage;
