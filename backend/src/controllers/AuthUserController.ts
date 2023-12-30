import { Request, Response } from "express";
import { AuthUserError } from "../errors/AuthUserError";
import { IAuthUserUseCase } from "../use-cases/auth-user/IAuthUserUseCase";
import { DomainError } from "../errors/DomainError";
import { AuthUserInput } from "../use-cases/auth-user/AuthUserInput";
import { ApplicationError } from "../errors/ApplicationError";
import { IController } from "./IController";

export class AuthUserController implements IController {
  constructor(private readonly authUserUseCase: IAuthUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new AuthUserInput(req.body);
      const output = await this.authUserUseCase.execute(input);
      return res.status(200).json(output);
    } catch (error: any) {
      if (error instanceof DomainError || error instanceof ApplicationError)
        return res.status(400).json({ errorMessage: error.message });

      if (error instanceof AuthUserError)
        return res.status(401).json({ errorMessage: error.message });

      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
