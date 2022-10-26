export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string
}

export type UserCreation = Omit<IUser, 'id'>;
export type UserQuery = Omit<IUser, 'password'>;
export type UserLogin = Pick<IUser, 'email' | 'password'>;
