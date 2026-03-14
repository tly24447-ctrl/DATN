import { UpdateOrderUseCase } from '@/src/domain/use-case/order.use-case';
import { VnPayService } from '@/src/presentation/services/vn-pay.service';
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import express from 'express';

@Controller('payment/vnpay')
export class VnPayController {
  constructor(
    private readonly vnPayService: VnPayService,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
  ) {}

  @Post('create-url')
  createUrl(
    @Body() dto: { orderId: string; amount: number },
    @Req() req: express.Request,
  ) {
    console.log('dto', dto);
    // 1. Setup VnPay params (vnp_TmnCode, vnp_HashSecret, etc.)
    // 2. Generate signature
    // 3. Return the URL to Next.js
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ipAddress =
      (req.headers['x-forwarded-for'] as string) ||
      req.ip ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req as any).socket?.remoteAddress ||
      '127.0.0.1';
    const url = this.vnPayService.createPaymentUrl(
      dto.orderId,
      dto.amount,
      ipAddress as string,
    );

    console.log('url', url);
    return { url };
  }

  @Get('vnpay-return')
  async vnpayReturn(@Query() query: any, @Res() res: express.Response) {
    console.log('query', query);
    console.log('res', res);
    // 1. Extract values to avoid repeated 'any' access and long strings
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const orderId = query.vnp_TxnRef; // Mã đơn hàng của bạn
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const responseCode = query.vnp_ResponseCode;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const transactionNo = query.vnp_TransactionNo;
    const baseUrl =
      process.env.FRONTEND_URL || 'http://localhost:3000/checkout';

    // 2. Determine the target path based on the response code
    const isSuccess = responseCode === '00';
    const targetPath = isSuccess ? 'order-success' : 'order-fail';

    // 3. Cập nhật Order nếu thanh toán thành công
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.updateOrderUseCase.execute(orderId, {
        isPaid: true,
        paidAt: new Date(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        vnPayId: transactionNo, // Lưu mã giao dịch VNPay để đối soát
        isCart: false, // Đơn hàng đã thanh toán không còn là giỏ hàng
      });
    }

    // 4. Final single redirect
    return res.redirect(`${baseUrl}/${targetPath}?id=${orderId}`);
  }
}
