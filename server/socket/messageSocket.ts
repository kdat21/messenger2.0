import { MySocket } from "./socket";

let messageInstance: any;

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
