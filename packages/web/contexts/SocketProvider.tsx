"use client";
import { createContext, useContext } from "react";
import { Share } from "@/types/shareType";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAppStore } from "@/lib/store";

interface SocketContextType {
  socket: string;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error("useSocket has to be used within <SocketContext.Provider>");
  }

  return socketContext;
};
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { data: session } = useSession();
  const { addAlert } = useAppStore();
  useEffect(() => {
    if (!socket && session && session.user && session.user.token) {
      let socketClient = io(
        process.env.API_URL + "/shares" || "http://localhost:3000/shares",
        {
          extraHeaders: {
            Authorization: `Bearer ${session?.user.token}`,
          },
          auth: {
            token: `Bearer ${session?.user.token}`,
          },
        }
      );
      setSocket(socketClient);
    }
    if (socket) {
      socket.on("new_share", (data: Share) => {
        if (data.user_id != session?.user.id) {
          addAlert({
            title: "New video share",
            desc: `${data.email} have just shared a video`,
            type: "info",
          });
        }
        console.log("hello", data);
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(undefined);
      }
    };
  }, [session, session?.user, session?.user.token, socket, addAlert]);

  return (
    <SocketContext.Provider value={{ socket: "" }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
