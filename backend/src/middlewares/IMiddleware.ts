export interface IMiddleware {
  handle(req: any, res: any, next: any): any;
}
