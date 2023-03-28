import { Router, Request, Response } from "express";
import { authUserController, createUserController } from "./factory";

const router = Router();

router.post("/user/signup", (req: Request, res: Response) => {
  return createUserController.execute(req, res);
});
router.post("/user/signin", (req: Request, res: Response) => {
  return authUserController.execute(req, res);
});

export { router as routes };
