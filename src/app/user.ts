export interface User {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  id: number;
  roles: [string];
  bucketList: [];
}
