// src/domain/services/payment.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private readonly VCB_BANK_ID = '970436'; // Mã BIN của Vietcombank
  private readonly ACCOUNT_NO = '1234567890'; // Số tài khoản VCB của bạn
  private readonly ACCOUNT_NAME = 'Ngoc'; // Tên chủ tài khoản

  generateQrCode(orderId: string, amount: number) {
    const description = `Thanh toan don hang ${orderId}`;

    // Sử dụng template 'qr_only' để lấy trực tiếp link ảnh QR
    const qrUrl = `https://img.vietqr.io/image/${this.VCB_BANK_ID}-${this.ACCOUNT_NO}-qr_only.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(this.ACCOUNT_NAME)}`;

    return {
      qrUrl,
      amount,
      orderId,
      description,
    };
  }
}
