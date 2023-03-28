export type UserProps = {
  id?: string;
  email: string;
  password?: string;
};

export interface IUser {
  readonly id: string;
  readonly email: string;
  password?: string;
}
