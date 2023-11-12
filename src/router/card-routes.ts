import BaseRouter from "./base/base-router";
import CardController from "../controllers/card-controller";
import validate from "../helpers/validate";
import { createCardSchema, updatedCardSchema } from "../schemas/card-schemas";

class CardRoutes extends BaseRouter {
  public routes(): void {
    this.router.post("", validate(createCardSchema), CardController.create);
    this.router.patch(
      "/:id",
      validate(updatedCardSchema),
      CardController.update
    );
    this.router.delete("/:id", CardController.delete);
    this.router.get("", CardController.findAll);
    this.router.get("/:id", CardController.findById);
  }
}

export default new CardRoutes().router;
