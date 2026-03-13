export class CategoryEntity {
  private id?: string;
  name!: string;
  description?: string;
  image?: string;
  createdAt?: Date;
  _id?: string; // For compatibility with MongoDB documents
}
