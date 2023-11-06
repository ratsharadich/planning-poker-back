import express from "express";
import http from "http";
import { Server } from "socket.io";
import { join } from "./src/socket-actions";
import { cleanupSessions } from "./src/lib";
import { Session } from "./src/services";
import cors from "cors";
import router from "./src/router";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {},
});

app.use(cors());
app.use("/api", router);

export const activeSessions = new Map<string, Session>();
setInterval(() => cleanupSessions(activeSessions), 60 * 60 * 1000); // Run cleanup every hour

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  join({ socket, activeSessions });

  socket.on("disconnect", () => console.log("disconnected"));
});

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
