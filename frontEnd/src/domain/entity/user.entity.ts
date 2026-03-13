export class UserEntity {
  id?: string;
  name!: string;
  email!: string;
  password!: string;
  isAdmin?: boolean;
  phone?: number;
  address?: string;
  avatar?: string;
  city?: string;
  createdAt?: Date;
  _id?: string;
}
