import { Response } from "express";

export abstract class HttpResponses {
  public static httpResponse(
    res: Response,
    errorMessage: string,
    statusCode: number
  ): Response {
    return res.status(statusCode).json({ errorMessage });
  }

  public static httpForbidden(res: Response, errorMessage: string): Response {
    return HttpResponses.httpResponse(res, errorMessage, 403);
  }

  public static httpInternalError(
    res: Response,
    errorMessage: string
  ): Response {
    return HttpResponses.httpResponse(res, errorMessage, 500);
  }

  public static httpBadRequest(res: Response, errorMessage: string): Response {
    return HttpResponses.httpResponse(res, errorMessage, 400);
  }

  public static httpUnauthorized(res: Response): Response {
    return HttpResponses.httpResponse(res, "", 401);
  }
}
