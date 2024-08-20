import { IAuthUserSSOUseCase } from "../../use-cases/auth-user-sso/IAuthUserSSOUseCase";
import { AuthUserSSOInput } from "../../use-cases/auth-user-sso/AuthUserSSOInput";
import { CookieOptions, Request, Response } from "express";
import { IController } from "./IController";
import { StatusCode } from "../utils/StatusCode";

export class AuthUserSSOController implements IController {
  constructor(private readonly authUserSSOUseCase: IAuthUserSSOUseCase) {}

  async execute(req: Request, res: Response): Promise<Response | void> {
    try {
      const REDIRECT_HOST = process.env.SSO_REDIRECT_FRONTEND_HOST;
      const REDIRECT_PATH = process.env.SSO_REDIRECT_FRONTEND_PATH;
      const DOMAIN = process.env.FRONTEND_AND_BACKEND_DOMAIN;
      if (!REDIRECT_HOST || !REDIRECT_PATH || !DOMAIN)
        throw new Error("internal server error");

      const input = new AuthUserSSOInput(req.body);
      const output = await this.authUserSSOUseCase.execute(input);

      const cookieOptions: CookieOptions = {
        domain: DOMAIN,
        maxAge: 60000,
        httpOnly: false,
        secure: true,
        path: REDIRECT_PATH,
      };
      res.cookie("jwt", output.jwt, cookieOptions);
      res.cookie("refreshJwt", output.refreshJwt, cookieOptions);
      res.redirect(`${REDIRECT_HOST}${REDIRECT_PATH}`);
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
