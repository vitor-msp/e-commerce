import { Request, Response } from "express";
import { IController } from "./IController";
import { StatusCode } from "../utils/StatusCode";
import { ILogoutUseCase } from "../../use-cases/logout/ILogoutUseCase";
import { LogoutInput } from "../../use-cases/logout/LogoutInput";

export class LogutController implements IController {
  constructor(private readonly logoutUseCase: ILogoutUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new LogoutInput(req.body);
      await this.logoutUseCase.execute(input);
      return res.status(204).end();
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
