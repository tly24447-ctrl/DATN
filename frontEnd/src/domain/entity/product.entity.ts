export class ProductEntity {
  private id?: string;
  categoryId!: string;
  name!: string;
  image?: string;
  author!: string;
  publisher?: string;
  publicationDate?: Date;
  isbn?: string;
  pageCount?: number;
  language?: string;
  format?: 'Paperback' | 'Hardcover' | 'E-book';
  price!: number;
  countInStock!: number;
  rating?: number;
  description?: string;
  discount?: number;
  selled?: number;
  createdAt?: Date;
  _id?: string; // For compatibility with MongoDB documents
}
