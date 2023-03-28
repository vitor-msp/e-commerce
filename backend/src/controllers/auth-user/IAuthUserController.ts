import { Request, Response } from "express";
import { IAuthUserUseCase } from "../../use-cases/auth-user/IAuthUserUseCase";

export interface IAuthUserController {
  readonly authUserUseCase: IAuthUserUseCase;
  execute(req: Request, res: Response): Promise<Response>;
}
