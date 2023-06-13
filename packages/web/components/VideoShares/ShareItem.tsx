import { Share } from "@/types/shareType";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const ShareItem = (props:Share)=>{
    const {url} = props;
    return (
       <div className="w-48 h-36">
        <ReactPlayer url={url}/>
       </div>
        )
}
export default ShareItem;