import { Router, Request, Response } from "express";
import { VerifyAuth } from "../middlewares/VerifyAuth";
import {
  authUserController,
  createOrderController,
  createUserController,
  getOrdersController,
} from "./factory";

const router = Router();

router.post("/api/v1/user/signup", (req: Request, res: Response) => {
  return createUserController.execute(req, res);
});
router.post("/api/v1/user/signin", (req: Request, res: Response) => {
  return authUserController.execute(req, res);
});
router.post(
  "/api/v1/order",
  VerifyAuth.verify,
  (req: Request, res: Response) => {
    return createOrderController.execute(req, res);
  }
);
router.get(
  "/api/v1/order",
  VerifyAuth.verify,
  (req: Request, res: Response) => {
    return getOrdersController.execute(req, res);
  }
);

export { router as routes };
