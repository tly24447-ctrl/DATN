// src/domain/use-case/payment/generate-qr-code.use-case.ts
import { PaymentRepository } from "@/src/domain/repository/payment.repository";

export class GenerateQrCodeUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(orderId: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Số tiền thanh toán phải lớn hơn 0");
    }

    return await this.paymentRepository.generateQrCode(orderId, amount);
  }
}

export class HandleWebhookUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(body: unknown) {
    // 1. Xác thực dữ liệu thông qua Repository
    return await this.paymentRepository.verifyWebhook(body);
  }
}