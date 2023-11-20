import BaseRouter from "./base/base-router";
import UserController from "../controllers/user-controller";
import validate from "../helpers/validate";
import { createUserSchema, updatedUserSchema } from "../schemas/user-schemas";

class UserRoutes extends BaseRouter {
  public routes(): void {
    this.router.post("", validate(createUserSchema), UserController.create);
    this.router.patch(
      "/:id",
      validate(updatedUserSchema),
      UserController.update
    );
    this.router.delete("/:id", UserController.delete);
    this.router.get("/:id", UserController.findById);
  }
}

export default new UserRoutes().router;
