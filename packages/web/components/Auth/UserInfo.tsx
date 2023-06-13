"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import { MODAL } from "@/types/modal";
const UserInfo = ()=>{
    const { data: session } = useSession();
    const {toggle} = useAppStore();
    return (
        <div className="flex flex-col gap-3">
            <div>
            Welcome {session && session?.user && session.user.email}
            </div>
            <Button onClick={()=>{
                toggle(MODAL.SHARING);
            }}>Start sharing</Button>
            <Button onClick={()=>signOut()}>Logout</Button>
        </div>
    )
}
export default UserInfo;