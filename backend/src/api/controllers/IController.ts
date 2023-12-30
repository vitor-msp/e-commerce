export interface IController {
  execute(req: any, res: any): Promise<any>;
}
