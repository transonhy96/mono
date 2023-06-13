import { Skeleton } from "@/components/ui/skeleton";

const VideoSkeletal = (props: any) => {
  return (
    <div className="flex items-center space-x-4 w-1/3" {...props}>
      <Skeleton className="w-[250px] h-[200px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
export default VideoSkeletal;
