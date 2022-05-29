import { Session } from "express-session";

export interface ServerToClientEvents {
  chatMessage: (message: ChatMessageContent) => void;
  userOnline: () => void;
  userOffline: () => void;
}

export interface ClientToServerEvents {
  chatMessage: (message: any) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: {
    userName: string;
  };
}

declare module "http" {
  interface IncomingMessage {
    session: Session & { user?: { userName?: string } };
  }
}

export interface ChatMessageContent {
  message: string;
  to: string;
}
