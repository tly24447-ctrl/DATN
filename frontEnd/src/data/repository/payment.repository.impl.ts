// src/infrastructure/repository/payment.repository.impl.ts

import { PaymentRepository } from "@/src/domain/repository/payment.repository";
import { BaseRepositoryImpl } from "./base.repository.impl";

/**
 * Triển khai PaymentRepository để tương tác với các endpoint thanh toán (VietQR/Webhook) 
 * thông qua BaseRepositoryImpl đã có.
 */
export class PaymentRepositoryImpl extends BaseRepositoryImpl<unknown> implements PaymentRepository {
  constructor() {
    // Định nghĩa prefix cho các endpoint liên quan đến payment
    super('payments');
  }

  /**
   * Gọi đến NestJS endpoint: GET /payments/qr-code
   * Lấy URL mã QR từ server
   */
  async generateQrCode(orderId: string, amount: number): Promise<{ qrUrl: string; description: string; amount: number; orderId: string }> {
    const response = await this.api.get<{ qrUrl: string; description: string; amount: number; orderId: string }>(
      `${this.endpoint}/qr-code`,
      {
        params: { orderId, amount },
      }
    );

    return response.data;
  }

  /**
   * Gọi đến NestJS endpoint: POST /payments/webhook
   * Thường dùng để giả lập thanh toán từ phía client-side (Dev tool/Admin)
   */
  async verifyWebhook(body: unknown): Promise<{ orderId: string; amount: number } | null> {
    const response = await this.api.post<{ orderId: string; amount: number } | null>(
      `${this.endpoint}/webhook`,
      body
    );

    return response.data;
  }
}