import { Router, Request, Response } from "express";
import { createUserController } from "./factory";

const router = Router();

router.post("/user/signup", (req: Request, res: Response) => {
  return createUserController.execute(req, res);
});

export { router as routes };
