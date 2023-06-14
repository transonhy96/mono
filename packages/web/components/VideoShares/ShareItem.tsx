import { Share } from "@/types/shareType";
import moment from "moment";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const ShareItem = (props: Share) => {
  const { url, id, user, created_at } = props;
  return (
    <div className="flex gap-10 border rounded-sm px-3 py-2 cursor-pointer opacity-75 hover:opacity-100">
      <ReactPlayer width={250} height={200} url={url} />
      <div className="flex flex-col p-4 gap-3 truncate hover:text-clip">
        <p>Youtube video #{id}</p>
        <p>Shared by: {user && user?.email}</p>
        <p>Shared at: {moment(created_at).toString()}</p>
        <p>Description: {nanoid()}</p>
      </div>
    </div>
  );
};
export default ShareItem;
