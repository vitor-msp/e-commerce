import { ICreateUserUseCase } from "../../use-cases/create-user/ICreateUserUseCase";

export interface ICreateUserController {
  readonly createUserUseCase: ICreateUserUseCase;
  execute(req: any, res: any): Promise<any>;
}
