"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { UserAuth } from "../../app/auth/authContext";
import { ReactNode } from "react";

const NavBar = () => {
  const { user } = UserAuth();
  return (
    <div className="fixed top-0 left-0 right-0 bg-background">
      <div className="flex m-4">
        <div className={styles.logo}>TasteTier</div>
        <NavLink id={1} path={"/home"} title={"home"}></NavLink>
        {user == null ? (
          <NavLink id={2} path={"/auth/signin"} title={"sign in"}></NavLink>
        ) : (
          <>
            <NavLink id={2} path={"/rating"} title={"rate"}></NavLink>
            <NavLink id={2} path={"/profile"} title={"profile"}></NavLink>
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
      <div className={`${styles.button}  ${props.path === pathName ? styles.active : ""}`}>{props.title}</div>
    </Link>
  );
};
