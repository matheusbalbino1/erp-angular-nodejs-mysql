export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
}

export interface ICreateUser {
  username: string;
  password: string;
}

export interface IResponseCreateUser {
  status: string;
  message: User;
}

export interface IAuthUser {
  username: string;
  password: string;
}
