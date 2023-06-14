"use client";
import { Share } from "@/types/shareType";
import moment from "moment";
import ReactPlayer from "react-player";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
const ShareItem = (props: Share) => {
  const { url, id, user, created_at } = props;
  const { data: session } = useSession();
  return (
    <div className="shareItem flex gap-10 bg-secondary border rounded-sm px-3 py-2 cursor-pointer opacity-75 hover:opacity-100">
      <div className="relative">
        <ReactPlayer
          width={250}
          height={200}
          url={url}
          controls={true}
          fallback={<Skeleton className="w-[250px] h-[200px] rounded-xl" />}
        />
      </div>

      <div className="flex flex-col p-4 gap-3 truncate hover:text-clip">
        <p className="text-bold text-red-400 text-xl">Youtube video #{id}</p>
        <p>
          Shared by:{" "}
          <span>
            {user && user?.email
              ? user.email === session?.user.email
                ? "You"
                : user.email
              : "Not found"}
          </span>
        </p>
        <p>Shared at: {moment(created_at).toString()}</p>
        <p>Description: {"Sample Description"}</p>
      </div>
    </div>
  );
};
export default ShareItem;
