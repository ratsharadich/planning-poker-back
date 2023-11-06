import { Socket } from "socket.io";
import { v4 } from "uuid";
import { Session } from "../services";

export const join = ({
  socket,
  activeSessions,
}: {
  socket: Socket;
  activeSessions: Map<string, Session>;
}) => {
  socket.on(
    "join",
    ({
      roomId = "",
      roomName = "",
      userName,
    }: {
      roomId?: string;
      roomName?: string;
      userName: string;
    }) => {
      let session = activeSessions.get(roomId);

      if (session) {
        session = {
          ...session,
          users: session.users.find((user) => user.name === userName)
            ? session.users.map((user) =>
                user.name === userName
                  ? { id: socket.id, name: userName }
                  : user
              )
            : [...session.users, { id: socket.id, name: userName }],
        };
      }

      if (!session) {
        session = new Session({
          room: { id: v4(), name: roomName },
          user: { id: socket.id, name: userName },
        });
      }

      console.log(
        `User '${userName}' joined room '${roomName}', socketId ${socket.id}`
      );

      // Handle user joining the session and room
      socket.join(roomName);
      socket.emit("session-joined", {
        roomId: session.room.id,
      });

      activeSessions.set(session.room.id, session);

      // io.fetchSockets().then((sockets) => {
      //   for (const socket of sockets) {
      //     console.log(socket.id);
      //     console.log(socket.rooms);
      //   }
      // });

      console.log(activeSessions, "activeSessions");
      console.log(" ");
      console.log(session, "session");
      console.log(" ");
      console.log(
        activeSessions.get(session.room.id)?.users,
        "activeSessions.users"
      );
    }
  );
};
