export enum PaymentMethod {
  STRIPE = 'Stripe',
  PAYPAL = 'PayPal',
  COD = 'COD',
  VNPAY = 'VnPay',
  VNQR = 'VnQr',
}

export const PaymentMethodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.STRIPE]: 'Stripe',
  [PaymentMethod.PAYPAL]: 'PayPal',
  [PaymentMethod.COD]: 'Cash on Delivery',
  [PaymentMethod.VNPAY]: 'VnPay',
  [PaymentMethod.VNQR]: "VnQr"
};