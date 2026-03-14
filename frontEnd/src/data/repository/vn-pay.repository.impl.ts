import { VnPayRepository } from "@/src/domain/repository/vn-pay.repository";
import { BaseRepositoryImpl } from "./base.repository.impl";

export class VnPayRepositoryImpl extends BaseRepositoryImpl<unknown> implements VnPayRepository {
  constructor() {
    // Pass the endpoint prefix to the base constructor
    super('payment/vnpay');
  }

  /**
   * Calls the NestJS @Post('create-url') endpoint
   */
  async createPaymentUrl(orderId: string, amount: number, ipAddress: string): Promise<string> {
    const response = await this.api.post<{ url: string }>(`${this.endpoint}/create-url`, {
      orderId,
      amount,
      ipAddress, // The backend can use this or detect it from req
    });

    return response.data.url;
  }

  /**
   * Note: verifyReturnUrl is usually handled BY the backend during redirection.
   * However, if you need to verify it on the client-side for some reason:
   */
  async verifyReturnUrl(query: Record<string, unknown>): Promise<boolean> {
    const response = await this.api.get<{ isValid: boolean }>(`${this.endpoint}/vnpay-return`, {
      params: query,
    });

    return response.data.isValid;
  }
}
