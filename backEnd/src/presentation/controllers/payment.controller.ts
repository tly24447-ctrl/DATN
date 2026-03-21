// src/presentation/controllers/payment.controller.ts
import { UpdateOrderUseCase } from '@/src/domain/use-case/order.use-case';
import { PaymentService } from '@/src/presentation/services/payment.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentGateway } from '../gateways/payment.gateway';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  /**
   * Endpoint: GET /payments/qr-code?orderId=123&amount=500000
   * Lấy link mã QR để hiển thị ở Frontend
   */
  @Get('qr-code')
  getQrCode(
    @Query('orderId') orderId: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    return this.paymentService.generateQrCode(orderId, amount);
  }

  /**
   * Endpoint: POST /payments/webhook
   * Dùng để các bên như Casso/SePay gọi về hoặc để bạn giả lập thanh toán thành công
   * URL: http://localhost:3001/payments/webhook

      Method: POST

      Headers: Content-Type: application/json
      {
        "content": "Thanh toan don hang DH65f123abc",
        "amount": 500000,
        "account_receiver": "1234567890",
        "gateway": "Vietcombank"
      }
   */
  @Post('webhook')
  async handlePaymentWebhook(@Body() body: any) {
    // 1. Log dữ liệu nhận được để debug
    console.log('--- Nhận dữ liệu thanh toán giả lập ---', body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { content, amount } = body;

    if (!content) {
      throw new BadRequestException('Nội dung chuyển khoản trống');
    }

    // 2. Trích xuất mã đơn hàng từ nội dung (Regex)
    // Giả sử nội dung là: "Thanh toan don hang DH12345"
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const orderIdMatch = content.match(/(\w+)$/);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const orderId = orderIdMatch ? orderIdMatch[1] : null;

    if (orderId) {
      console.log(`Tìm thấy mã đơn hàng: ${orderId}, Số tiền: ${amount}`);

      // 3. Gọi UseCase cập nhật đơn hàng thành công
      // await this.updateOrderUseCase.execute(orderId, { status: 'PAID' });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.updateOrderUseCase.execute(orderId, {
        isPaid: true,
        paidAt: new Date(),
        isCart: false, // Đơn hàng đã thanh toán không còn là giỏ hàng
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.paymentGateway.server.to(orderId).emit('paymentSuccess', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        orderId: orderId,
        message: 'Thanh toán thành công rồiiii!',
      });

      return {
        status: 'success',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        orderId: orderId,
        message: 'Cập nhật trạng thái thanh toán thành công',
      };
    }

    return { status: 'error', message: 'Không tìm thấy mã đơn hàng hợp lệ' };
  }
}
