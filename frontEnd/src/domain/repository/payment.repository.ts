// src/domain/repository/payment.repository.ts

export abstract class PaymentRepository {
  /**
   * Tạo chuỗi URL hoặc Data cho mã QR
   */
  abstract generateQrCode(
    orderId: string, 
    amount: number
  ): Promise<{ qrUrl: string; description: string; amount: number; orderId: string }>;

  /**
   * Xác thực dữ liệu Webhook từ bên thứ 3 (Casso/SePay)
   * Trả về mã đơn hàng nếu hợp lệ
   */
  abstract verifyWebhook(body: unknown): Promise<{ orderId: string; amount: number } | null>;
}