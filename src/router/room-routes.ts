import BaseRouter from "./base/base-router";
import RoomController from "../controllers/room-controller";
import validate from "../helpers/validate";
import { createRoomSchema, updatedRoomSchema } from "../schemas/room-schemas";

class RoomRoutes extends BaseRouter {
  public routes(): void {
    this.router.post("", validate(createRoomSchema), RoomController.create);
    this.router.patch(
      "/:id",
      validate(updatedRoomSchema),
      RoomController.update
    );
    this.router.delete("/:id", RoomController.delete);
    this.router.get("", RoomController.findAll);
    this.router.get("/:id", RoomController.findById);
  }
}

export default new RoomRoutes().router;
