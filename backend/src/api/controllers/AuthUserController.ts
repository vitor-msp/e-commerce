import { Request, Response } from "express";
import { IAuthUserUseCase } from "../../use-cases/auth-user/IAuthUserUseCase";
import { AuthUserInput } from "../../use-cases/auth-user/AuthUserInput";
import { IController } from "./IController";
import { StatusCode } from "../utils/StatusCode";

export class AuthUserController implements IController {
  constructor(private readonly authUserUseCase: IAuthUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new AuthUserInput(req.body);
      const output = await this.authUserUseCase.execute(input);
      return res.status(200).json(output);
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
