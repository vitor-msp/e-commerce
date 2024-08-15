import { Role } from "../store/user/user.types";

export const GetRoleFromJwt = (jwt: string): Role | undefined => {
  const payload = jwt.split(".")[1];
  const content: { role: string } = JSON.parse(atob(payload));
  return Role[content.role as keyof typeof Role];
};
