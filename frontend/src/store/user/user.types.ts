export enum Role {
  Customer = "Customer",
  Administrator = "Administrator",
}
export interface IUser {
  isLogged: boolean;
  role?: Role;
  wantsBuy: boolean;
}
export const LOCAL_STORAGE_JWT_KEY_NAME: string = "e-commerce:jwt";
export const LOCAL_STORAGE_REFRESH_JWT_KEY_NAME: string =
  "e-commerce:refresh-jwt";
export interface IUserState {
  user: IUser;
}
