import { Request, Response } from "express";
import { DomainError } from "../../errors/DomainError";
import { ICreateUserUseCase } from "../../use-cases/create-user/ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";
import { CreateUserInput } from "../../use-cases/create-user/CreateUserInput";
import { ApplicationError } from "../../errors/ApplicationError";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new CreateUserInput(req.body);
      await this.createUserUseCase.execute(input);
      return res.status(201).send();
    } catch (error: any) {
      if (error instanceof DomainError || error instanceof ApplicationError)
        return res.status(400).json({ errorMessage: error.message });

      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
