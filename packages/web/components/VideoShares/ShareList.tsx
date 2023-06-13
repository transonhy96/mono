"use client";
import { useAppStore } from "@/lib/store";
import { useEffect, Fragment } from "react";
import ShareItem from "./ShareItem";
import VideoSkeletal from "./Skeletal";
import { nanoid } from "nanoid";
import Pagination, { PageSize } from "../Pagination";
const ShareList = () => {
  const { fetchShares, shares, isFetchShareLoading, count } = useAppStore();

  useEffect(() => {
    fetchShares();
  }, [fetchShares]);
  console.log({ isFetchShareLoading });
  const skeletals = Array(PageSize).fill(1);
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      {isFetchShareLoading
        ? skeletals.map(() => (
          <Fragment key={nanoid()}>
            <VideoSkeletal></VideoSkeletal>
          </Fragment>
        ))
        : shares.length > 0 &&
        shares
          .filter((s) => s.url !== "http://localhost:3000")
          .map((s) => (
            <ShareItem key={s.id} url={s.url} user_id={s.user_id} />
          ))}
      {count > PageSize && <Pagination total={count}></Pagination>}
    </div>
  );
};
export default ShareList;
