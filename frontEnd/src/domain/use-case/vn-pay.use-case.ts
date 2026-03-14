import { VnPayRepository } from "@/src/domain/repository/vn-pay.repository";

export class CreateVnPayUrlUseCase {
  constructor(private readonly vnPayRepository: VnPayRepository) {}

  async execute(params: {
    orderId: string;
    amount: number;
    ipAddress: string;
  }): Promise<string> {
    if (params.amount <= 0) {
      throw new Error("Invalid payment amount");
    }

    // Business logic: VnPay only accepts integer amounts
    const roundedAmount = Math.round(params.amount);

    return await this.vnPayRepository.createPaymentUrl(
      params.orderId,
      roundedAmount,
      params.ipAddress
    );
  }
}

export class VerifyVnPayPaymentUseCase {
  constructor(private readonly vnPayRepository: VnPayRepository) {}

  async execute(query: Record<string, unknown>): Promise<{
    isValid: boolean;
    orderId: string | null;
    isSuccess: boolean;
  }> {
    // 1. Verify the Secure Hash (Checksum)
    const isValid = await this.vnPayRepository.verifyReturnUrl(query);
    
    // 2. Extract specific VnPay response codes
    // vnp_ResponseCode '00' indicates success
    const responseCode = query['vnp_ResponseCode'] as string;
    const orderId = (query['vnp_TxnRef'] as string) || null;

    return {
      isValid,
      orderId,
      isSuccess: isValid && responseCode === '00',
    };
  }
}
