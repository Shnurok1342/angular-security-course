export interface AuthUser {
  email: string;
  name: string;
}

export interface DbUser {
  id: number;
  email: string;
}

export interface UserInfo {
  auth0: AuthUser;
  db: DbUser;
}
