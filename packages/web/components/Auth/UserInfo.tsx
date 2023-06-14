"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import { MODAL } from "@/types/modal";

const UserInfo = () => {
    const { data: session } = useSession();
    const { toggleSidebar } = useAppStore();
    const { toggle } = useAppStore();
    return (
        <div className="flex flex-col gap-5 mt-5">
            <div>Welcome {session && session?.user && session.user.email}</div>
            <Button
                className="mt-3 cpBtnShare"
                onClick={() => {
                    toggleSidebar();
                    toggle(MODAL.SHARING);
                }}
            >
                Start sharing
            </Button>
            <Button className="cpBtnLogout" variant={"outline"} onClick={() => signOut()}>
                <span>Logout</span>
            </Button>
        </div>
    );
};
export default UserInfo;
