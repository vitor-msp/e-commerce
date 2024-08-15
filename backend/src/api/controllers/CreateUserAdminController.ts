import { Request, Response } from "express";
import { IController } from "./IController";
import { StatusCode } from "../utils/StatusCode";
import { CreateUserInput } from "../../domain/services/create-user/CreateUserInput";
import { ICreateUserAdminUseCase } from "../../use-cases/create-user-admin/ICreateUserAdminUseCase";

export class CreateUserAdminController implements IController {
  constructor(
    private readonly createUserAdminUseCase: ICreateUserAdminUseCase
  ) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new CreateUserInput(req.body);
      await this.createUserAdminUseCase.execute(input);
      return res.status(201).send();
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
