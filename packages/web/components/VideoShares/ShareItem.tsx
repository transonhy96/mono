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
    <div className="shareItem w-5/6 lg:w-1/3 h-[450px] lg:mt-5 flex flex-col gap-4 lg:gap-10 bg-transparent border rounded-sm px-3 py-2 cursor-pointer opacity-75 hover:opacity-100">
      <div className="relative w-full h-3/5">
        <ReactPlayer
          url={url}
          controls={true}
          width="100%"
          height="100%"
          fallback={<Skeleton className="w-[250px] h-[200px] rounded-xl" />}
        />
      </div>

      <div className="flex flex-col p-4 gap-3 hover:text-clip">
        <p className="text-bold text-red-400 sm:text-md text-xl break-words">
          Youtube video #{id}
        </p>
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
        <p className="break-words">
          Shared at: {moment(created_at).toString()}
        </p>
        <p className="break-words">Description: {"Sample Description"}</p>
      </div>
    </div>
  );
};
export default ShareItem;
