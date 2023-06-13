import { Skeleton } from "@/components/ui/skeleton"

const VideoSkeletal = (props:any)=> {
  return (
    <div className="flex items-center space-x-4 w-48 h-36 bg-red-900" {...props}>
      <Skeleton className="w-48 h-36 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
export default VideoSkeletal;
