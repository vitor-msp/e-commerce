export interface IUser {
  isLogged: boolean;
}
export const LOCAL_STORAGE_JWT_KEY_NAME: string = "e-commerce:jwt";
export interface IUserState {
  user: IUser;
}
