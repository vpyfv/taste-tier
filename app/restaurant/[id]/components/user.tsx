import Image from "next/image";
import { RestRatedUser } from "../types";
import Link from "next/link";

const Users = ({ users }: { users: RestRatedUser[] }) => {
  return users.map((user, i) => (
    <Link key={i} href={`/user/${user.userId}`}>
      <div className="m-2">
        <div className="flex bg-card rounded-full items-center justify-between w-fit">
          <Image
            src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
            alt=""
            width={50}
            height={50}
            className="shadow rounded-full max-w-full h-auto align-middle border-none mr-2"
          ></Image>
          <p className="mx-2">
            {user.name.slice(0, 10)} {user.name.length > 10 ? "..." : ""}
          </p>
          <p className="mx-4">{user.rating}</p>
        </div>
      </div>
    </Link>
  ));
};
export default Users;
