export class VoucherEntity {
  id?: string;
  code!: string;
  discountType!: 'percentage' | 'fixed';
  discountValue!: number;
  minOrderValue?: number;
  maxUses!: number;
  usedCount?: number;
  startDate!: Date;
  expirationDate!: Date;
  isActive?: boolean;
}
