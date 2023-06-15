import type { Server as HTTPServer } from "http";
import type { NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import { Share } from "./shareType";

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export interface ServerToClientEvents {
  userServerConnection: () => void;
  new_share: (data: Share) => void;
  userServerDisconnection: (socketid: string) => void;
}

export interface ClientToServerEvents {
  hello: (msg: string) => void;
  userServerConnection: () => void;
  userServerDisconnection: (socketid: string) => void;
}
