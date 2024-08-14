import { Request, Response } from "express";
import { IController } from "./IController";
import { IRefreshTokenUseCase } from "../../use-cases/refresh-token/IRefreshTokenUseCase";
import { RefreshTokenInput } from "../../use-cases/refresh-token/RefreshTokenInput";
import { StatusCode } from "../utils/StatusCode";

export class RefreshTokenController implements IController {
  constructor(private readonly refreshTokenUseCase: IRefreshTokenUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new RefreshTokenInput(req.body);
      const output = await this.refreshTokenUseCase.execute(input);
      return res.status(200).json(output);
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
