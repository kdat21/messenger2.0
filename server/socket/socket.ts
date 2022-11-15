import { Namespace } from "socket.io";
import { io } from "..";

let instance: any;
let messageInstance: any;

class MySocket {
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

export class MessageSocket extends MySocket {
  static getInstance() {
    if (!messageInstance) messageInstance = new MessageSocket("/message");

    return messageInstance;
  }

  constructor(namespace: string) {
    super(namespace);
    this.getSocket().on("connection", (socket) => {
      socket.on("sendMessage", (data: any) => {
        console.log(
          `new message '${data.message.content}' at conversation ${data.message.conversationId}`
        );
        socket
          .to(data.message.conversationId)
          .emit("newMessageSent", data.message);
      });
    });
  }
}
