import { Share } from "@/types/shareType";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const ShareItem = (props: Share) => {
  const { url } = props;
  return (
    <div className="flex gap-10 border rounded-sm px-3 py-2">
      <ReactPlayer width={250} height={200} url={url} />
      <div className="flex flex-col">
        <p>Title</p>
        <p>Shared by @gmail.com</p>
        <p>Video desc</p>
      </div>
    </div>
  );
};
export default ShareItem;
