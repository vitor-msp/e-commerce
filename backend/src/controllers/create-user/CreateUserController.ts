import { Request, Response } from "express";
import {
  CreateUserInputDto,
  ICreateUserUseCase,
} from "../../use-cases/create-user/ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";

export class CreateUserController implements ICreateUserController {
  constructor(readonly createUserUseCase: ICreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.email) throw new Error("missing email");
      if (!req.body.password) throw new Error("missing password");
      const input: CreateUserInputDto = req.body;
      await this.createUserUseCase.execute(input);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ errorMessage: error.message });
    }
  }
}
