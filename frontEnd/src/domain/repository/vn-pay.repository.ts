export abstract class VnPayRepository {
  abstract createPaymentUrl(
    orderId: string,
    amount: number,
    ipAddress: string
  ): Promise<string>;

  abstract verifyReturnUrl(query: Record<string, unknown>): Promise<boolean>;
}