"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";

type link = {
  title: string;
  path: string;
};

const NavBar = () => {
  const pathName = usePathname();

  const links: link[] = [
    { title: "home", path: "/home" },
    // { title: "rate", path: "/" },
    // { title: "profile", path: "/" },
    // { title: "suggest", path: "/" },
    { title: "sign in", path: "/auth/signin" },
  ];
  return (
    <div className="fixed top-0 left-0 right-0 bg-background">
      <div className="flex m-4">
        <div className={styles.logo}>TasteTier</div>
        {links.map((l, i) => (
          <Link className="mr-4" key={i} href={l.path}>
            <div className={`${styles.button}  ${l.path === pathName ? styles.active : ""}`}>{l.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default NavBar;
