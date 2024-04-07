"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAuth } from "../../app/auth/authContext";
import { ReactNode } from "react";

const NavBar = () => {
  const { user } = UserAuth();
  return (
    <div className="fixed top-0 left-0 right-0 bg-background font-mono">
      <div className="flex m-4">
        <div className="flex-1 ">
          <Link
            href={"/home"}
            className="text-4xl drop-shadow-lg inline-block after:duration-500 ease-out after:block after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-card after:transition-transform after:hover:origin-bottom-left after:hover:scale-x-100"
          >
            TasteTier
          </Link>
        </div>
        <NavLink id={1} path={"/home"} title={"home"}></NavLink>
        {user == null ? (
          <NavLink id={2} path={"/auth/signin"} title={"sign in"}></NavLink>
        ) : (
          <>
            <NavLink id={2} path={"/rating"} title={"rate"}></NavLink>
            <NavLink id={2} path={`/user/${user.uid}`} title={"profile"}></NavLink>
            <NavLink id={2} path={"/suggest"} title={"suggest"}></NavLink>
            <NavLink id={2} path={"/auth/signout"} title={"sign out"}></NavLink>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBar;

export const NavLink = (props: { id: number; title: string; path: string }): ReactNode => {
  const pathName = usePathname();
  return (
    <Link className="mr-4" key={props.id} href={props.path}>
      <div className={`${props.path === pathName ? "bg-card px-8 py-2 rounded-full text-text-color-s" : "px-8 py-2"}`}>
        {props.title}
      </div>
    </Link>
  );
};
