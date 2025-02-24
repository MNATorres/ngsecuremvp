import { Role } from '../enums/role';

export interface IAuthData {
  accessToken?: string;
  id: string;
  username: string;
  email: string;
  role: Role;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface ICurrentUserAndRole {
  username: string;
  role: Role;
}
