export class VoucherEntity {
  private id?: string;
  code!: string;
  discountType!: 'percentage' | 'fixed';
  discountValue!: number;
  minOrderValue?: number;
  maxUses!: number;
  usedCount?: number;
  startDate!: Date;
  expirationDate!: Date;
  isActive?: boolean;
  _id?: string; // For compatibility with MongoDB documents
}
