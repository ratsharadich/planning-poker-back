type User = {
  id: string;
  name: string;
};

type Room = User;

type Args = {
  room: Room;
  user: User;
};

export class Session {
  room: Room;
  users: User[];
  timestamp: number;

  constructor({ room, user }: Args) {
    this.room = room;
    this.users = [user];
    this.timestamp = Date.now();
  }
}
