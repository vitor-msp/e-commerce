import { Request, Response } from "express";
import { ICreateUserUseCase } from "../../use-cases/create-user/ICreateUserUseCase";

export interface ICreateUserController {
  readonly createUserUseCase: ICreateUserUseCase;
  execute(req: Request, res: Response): Promise<Response>;
}
