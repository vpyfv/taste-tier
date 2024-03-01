"use client";
import { useEffect } from "react";
import { UserAuth } from "../authContext";
import { redirect } from "next/navigation";

const SignOutPage = () => {
  const { logout } = UserAuth();
  useEffect(() => {
    logout().then(redirect("/auth/signin"));
  }, [logout]);

  return <div>Sign out</div>;
};
export default SignOutPage;
