import { Request, Response } from "express";
import { CreateUserError } from "../../errors/CreateUserError";
import { UserError } from "../../errors/UserError";
import {
  CreateUserInputDto,
  ICreateUserUseCase,
} from "../../use-cases/create-user/ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";

export class CreateUserController implements ICreateUserController {
  constructor(readonly createUserUseCase: ICreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.email) throw new CreateUserError("missing email");
      if (!req.body.password) throw new CreateUserError("missing password");
      const input: CreateUserInputDto = req.body;
      await this.createUserUseCase.execute(input);
      return res.status(201).send();
    } catch (error: any) {
      if (error instanceof UserError || error instanceof CreateUserError)
        return res.status(400).json({ errorMessage: error.message });
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
