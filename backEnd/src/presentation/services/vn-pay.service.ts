import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { format } from 'date-fns';

@Injectable()
export class VnPayService {
  createPaymentUrl(orderId: string, amount: number, ipAddress: string): string {
    const tmnCode = 'QSXL5K96';
    // const tmnCode = '2ULIWFSW';
    const secretKey = 'RTM9TQGVEBSBHSKHJE4023PO8HT3E32L';
    // const secretKey = '7VII6MPM8R65W2IU5S1USB3DX364WP3E';
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:3001/payment/vnpay/vnpay-return';

    const createDate = format(new Date(), 'yyyyMMddHHmmss');

    const vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`, // Có thể để dấu cách
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddress === '::1' ? '127.0.0.1' : ipAddress,
      vnp_CreateDate: createDate,
    };

    // 1. Sắp xếp keys
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const sortedKeys = Object.keys(vnp_Params).sort();

    // 2. Tạo chuỗi ký và chuỗi query
    let signData = '';
    let queryUrl = '';

    sortedKeys.forEach((key, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const value = String(vnp_Params[key]);
      if (index > 0) {
        signData += '&';
        queryUrl += '&';
      }

      // QUAN TRỌNG: signData dùng giá trị thô, queryUrl dùng giá trị đã encode
      signData += `${key}=${value}`;
      queryUrl += `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`;
    });

    // 3. Tạo Hash từ signData (chuỗi thô)
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return `${vnpUrl}?${queryUrl}&vnp_SecureHash=${signed}`;
  }
}
