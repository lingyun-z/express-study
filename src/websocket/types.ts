import { Session } from "express-session";
import socket from "socket.io";

export interface ClientToServerEvents {
  chatMessage: (message: ChatMessageFromClient) => void;
}

export interface ServerToClientEvents {
  chatMessage: (message: ChatMessageToClient) => void;
  userOnline: ({ userId: string }) => void;
  userOffline: ({ userId: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user?: {
    userName?: string;
  };
}

export interface ChatMessageFromClient {
  content: string;
  to: string;
}

export interface ChatMessageToClient {
  content: string;
  timestamp: number;
  from: string;
}

export type Socket = socket.Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
