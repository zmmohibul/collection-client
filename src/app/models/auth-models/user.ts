import { UserRole } from './userRole';

export interface User {
  username: string;
  role: UserRole;
  token: string;
}
