import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import {Server} from "socket.io";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import messageRouter from "./routes/message";
import userRouter from "./routes/user";

connectDB();

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
  }); 

app.use(express.json());
app.use(cors({ credentials: true, origin: `http://localhost:3000` }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/t", messageRouter);
app.use("/api/user", userRouter);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`); 

  socket.on('joinConversation', (conversationId: string) => {
    socket.join(conversationId)
    console.log(`join ${conversationId}`)
  })

  socket.on('leaveConversation', (conversationId: string) => {
    socket.leave(conversationId)
    console.log(`leave ${conversationId}`)
  })

  socket.on('sendMessage', (message: string, conversationId: string) => {
    console.log(`new message '${message}' at conversation ${conversationId}`)
    socket.to(conversationId).emit('newMessageSent')
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
