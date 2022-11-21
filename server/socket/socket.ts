import { Namespace } from "socket.io";
import { io } from "..";

let instance: any;

export class MySocket {
  #socket: Namespace;

  static getInstance() {
    if (!instance) instance = new MySocket("");

    return instance;
  }

  getSocket() {
    return this.#socket;
  }

  constructor(namespace: string) {
    this.#socket = io.of(namespace);
    this.#socket.on("connection", (socket) => {
      console.log(`user ${socket.id} connected`);

      socket.on("joinConversation", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`user ${socket.id} join ${conversationId}`);
      });

      socket.on("leaveConversation", (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`user ${socket.id} leave ${conversationId}`);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}