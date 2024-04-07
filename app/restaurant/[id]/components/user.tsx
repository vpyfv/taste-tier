import Image from "next/image";
import { RestRatedUser } from "../types";
import Link from "next/link";

const Users = ({ users }: { users: RestRatedUser[] }) => {
  return users.map((user, i) => (
    <Link key={i} href={`/user/${user.userId}`}>
      <div className="flex border rounded-full items-center justify-between w-fit p-4 m-2 hover:bg-text-color-p hover:text-text-color-s hover:shadow-2xl">
        <p className="mx-2">
          {user.name.slice(0, 10)} {user.name.length > 10 ? "..." : ""}
        </p>
        <p className="mx-4 font-bold text-lg">{user.rating}</p>
      </div>
    </Link>
  ));
};
export default Users;
