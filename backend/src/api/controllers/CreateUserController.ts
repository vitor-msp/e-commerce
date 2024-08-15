import { Request, Response } from "express";
import { ICreateUserUseCase } from "../../use-cases/create-user/ICreateUserUseCase";
import { IController } from "./IController";
import { StatusCode } from "../utils/StatusCode";
import { CreateUserInput } from "../../domain/services/create-user/CreateUserInput";

export class CreateUserController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new CreateUserInput(req.body);
      await this.createUserUseCase.execute(input);
      return res.status(201).send();
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
