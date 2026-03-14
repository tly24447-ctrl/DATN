export interface RatingDetail {
  userId: string;
  userName?: string; // Nên lưu thêm tên để hiển thị nhanh không cần join table
  avatar?: string; // URL ảnh đại diện của người bình luận
  score: number;
  comment?: string; // Nội dung bình luận (tùy chọn)
  createdAt: Date;
}

export interface RatingInfo {
  average: number; // Điểm trung bình hiển thị (ví dụ: 4.5)
  count: number; // Tổng số lượt đánh giá
  details: RatingDetail[]; // Danh sách để kiểm tra xem user đã vote chưa
}

export class ProductEntity {
  id?: string;
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
  rating?: RatingInfo;
  description?: string;
  discount?: number;
  selled?: number;
  createdAt?: Date;
}
