import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import messageRouter from "./routes/message";
import userRouter from "./routes/user";
import {
  ErrorHandler,
  handleBSONError,
  handleError,
  handleServerError,
} from "./helpers/ErrorHandler";
import { MessageSocket } from "./socket/messageSocket";
import { BSONTypeError } from "bson";

connectDB();

const PORT = 5000;

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(cors({ credentials: true, origin: `http://localhost:3000` }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/t", messageRouter);
app.use("/api/user", userRouter);

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res);
  }
);

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    handleBSONError(err, res);
  }
);

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    handleServerError(err, res);
  }
);

const messageSocket = MessageSocket.getInstance();

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
