"use client";
import { useAppStore } from "@/lib/store";
import { useEffect, Fragment } from "react";
import ShareItem from "./ShareItem";
import VideoSkeletal from "./Skeletal";
import Pagination, { PageSize } from "../Pagination";
const ShareList = () => {
  const { fetchShares, shares, isFetchShareLoading, count } = useAppStore();
  useEffect(() => {
    fetchShares(0, PageSize);
  }, [fetchShares]);
  const skeletals = Array(PageSize).fill(1);
  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      {isFetchShareLoading
        ? skeletals.map((_, i) => (
          <Fragment key={i}>
            <VideoSkeletal></VideoSkeletal>
          </Fragment>
        ))
        : shares.length > 0 &&
        shares.map((share) => <ShareItem key={share.id} {...share} />)}
      {count > PageSize && (
        <Pagination
          next={(offset) => {
            fetchShares(offset, PageSize);
          }}
          prev={(offset) => {
            fetchShares(offset, PageSize);
          }}
          total={count}
        ></Pagination>
      )}
    </div>
  );
};
export default ShareList;
