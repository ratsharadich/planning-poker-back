import "colors";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import RoomRoutes from "./src/router/room-routes";
import UserRoutes from "./src/router/user-routes";
import { userHandlers as registerUserHandlers } from "./src/socket-handlers";
import { cardHandlers as registerCardHandlers } from "./src/socket-handlers";
import Database from "./src/config/database";

const db = new Database();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {},
});

app.use(cors());
app.use(express.json());
app.use("/api/v1/room", RoomRoutes);
app.use("/api/v1/user", UserRoutes);

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const { roomId } = socket.handshake.query;

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
});

const startServer = async () => {
  await db.sequelize?.sync({ alter: true });
  httpServer.listen(3000, () => {
    console.log(" ");
    console.log("🤩 Server started on port 3000 🤩");
    console.log(" ");
  });
};

startServer();
