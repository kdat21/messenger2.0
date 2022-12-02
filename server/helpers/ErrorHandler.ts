import { NextFunction, Response, Request, RequestHandler } from "express";
import { BSONTypeError } from "bson";

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: Error, res: Response) => {
  if (err instanceof ErrorHandler) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ success: false, message });
  }
};

export const wrapAsync =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const handleBSONError = (err: Error, res: Response) => {
  if (err instanceof BSONTypeError)
    res.status(404).json({ success: false, message: "Conversation not found" });
};

export const handleServerError = (err: Error, res: Response) => {
  if (!(err instanceof BSONTypeError) && !(err instanceof ErrorHandler))
    res.status(500).json({ success: false, message: "Internal server error" });
};
