"use client";
import { useAppStore } from "@/lib/store";
import { useEffect, Fragment, useState } from "react";
import ShareItem from "./ShareItem";
import VideoSkeletal from "./Skeletal";
import { nanoid } from "nanoid";
import Pagination, { PageSize } from "../Pagination";
const ShareList = () => {
  const { fetchShares, shares, isFetchShareLoading, count } = useAppStore();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    fetchShares(offset, PageSize);
  }, [fetchShares, offset]);
  const skeletals = Array(PageSize).fill(1);
  return (
    <div className="flex flex-col items-center gap-10 mt-10 h-screen">
      {isFetchShareLoading
        ? skeletals.map(() => (
          <Fragment key={nanoid()}>
            <VideoSkeletal></VideoSkeletal>
          </Fragment>
        ))
        : shares.length > 0 &&
        shares.map((s) => (
          <ShareItem key={s.id} url={s.url} user_id={s.user_id} />
        ))}
      {count > PageSize && (
        <Pagination
          next={(offset) => {
            setOffset(offset);
          }}
          prev={(offset) => {
            setOffset(offset);
          }}
          total={count}
        ></Pagination>
      )}
    </div>
  );
};
export default ShareList;
