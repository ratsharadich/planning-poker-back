import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
// import router from "./src/router";
import { userHandlers as registerUserHandlers } from "./src/handlers";
import { cardHandlers as registerCardHandlers } from "./src/handlers";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {},
});

app.use(cors());
// app.use("/api", router);

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const { roomId, roomName } = socket.handshake.query;

  Object.defineProperty(socket, "roomId", {
    value: roomId,
    writable: true,
    enumerable: true,
    configurable: true,
  });

  if (typeof roomId === "string") {
    socket.join(roomId);
  }

  registerUserHandlers({ io, socket: socket as Socket & { roomId: string } });
  registerCardHandlers({ io, socket: socket as Socket & { roomId: string } });

  // join({ socket, activeSessions });
});

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
