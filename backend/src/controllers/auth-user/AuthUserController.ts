import { Request, Response } from "express";
import {
  AuthUserControllerError,
  AuthUserUseCaseError,
} from "../../errors/AuthUserError";
import { UserError } from "../../errors/UserError";
import {
  AuthUserInputDto,
  IAuthUserUseCase,
} from "../../use-cases/auth-user/IAuthUserUseCase";
import { IAuthUserController } from "./IAuthUserController";

export class AuthUserController implements IAuthUserController {
  constructor(readonly authUserUseCase: IAuthUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.email) throw new AuthUserControllerError("missing email");
      if (!req.body.password)
        throw new AuthUserControllerError("missing password");
      const input: AuthUserInputDto = req.body;
      const output = await this.authUserUseCase.execute(input);
      return res.status(200).json(output);
    } catch (error: any) {
      if (
        error instanceof UserError ||
        error instanceof AuthUserControllerError
      )
        return res.status(400).json({ errorMessage: error.message });
      if (error instanceof AuthUserUseCaseError)
        return res.status(401).json({ errorMessage: error.message });
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
