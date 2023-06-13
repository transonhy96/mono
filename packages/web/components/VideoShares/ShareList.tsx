"use client";
import { useAppStore } from "@/lib/store";
import {useEffect,Fragment} from 'react';
import ShareItem from "./ShareItem";
import VideoSkeletal from "./Skeletal";
import {nanoid} from 'nanoid';
const ShareList = ()=>{
const {fetchShares, shares, isFetchShareLoading} = useAppStore();

  useEffect(()=>{
    fetchShares()
  },[fetchShares]);
  console.log({isFetchShareLoading})
  const skeletals = Array(1);
    return (<>
    {isFetchShareLoading ? 
    (skeletals.map(()=><Fragment key={nanoid()}>
      <VideoSkeletal></VideoSkeletal>
    </Fragment>))
    : shares.length > 0 &&
    shares.filter(s=>s.url!=='http://localhost:3000').slice(0,1).map((s)=>
      <ShareItem key={s.id} url={s.url} user_id={s.user_id}/>
    )
  }
    
    </>)
}
export default ShareList;