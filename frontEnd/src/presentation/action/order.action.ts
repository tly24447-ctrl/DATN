'use server';

import { OrderEntity, OrderItem } from "@/src/domain/entity/order.entity";
import { PaymentMethod } from "@/src/domain/entity/payment.method";
import { VoucherEntity } from "@/src/domain/entity/voucher.entity";
import { AppProviders } from "@/src/provider/provider";

export interface CreateOrderDto {
  userId: string;
  voucher?: VoucherEntity | null;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export async function createOrderAction(formData: CreateOrderDto) {
  try {
    const order = new OrderEntity();
    order.userId = formData.userId;
    order.voucherId = formData.voucher?._id;
    order.orderItems = formData.orderItems;
    order.paymentMethod = formData.paymentMethod;
    order.itemsPrice = formData.itemsPrice;
    order.shippingPrice = formData.shippingPrice;
    order.totalPrice = formData.totalPrice;
    order.isCart = false;
    order.isPaid = formData.paymentMethod === 'COD' ? false : true;
    order.isDelivered = false;
    order.createdAt = new Date();

    // 3. Create the order
    const result = await AppProviders.CreateOrderUseCase.execute(order);

    // 4. Handle VnPay Redirection logic
    // if (formData.paymentMethod === PaymentMethod.VNPAY) {
    //   try {
    //     // 1. Get the use case from your providers
    //     const createVnPayUrlUseCase = AppProviders.CreateVnPayUrlUseCase;

    //     // 2. Execute the use case
    //     // Note: In a production server environment, you might need to extract 
    //     // the IP from headers (e.g., headers().get('x-forwarded-for'))
    //     const paymentUrl = await createVnPayUrlUseCase.execute({
    //       orderId: result._id || '',
    //       amount: order.totalPrice, // or formData.totalPrice
    //       ipAddress: '127.0.0.1',     // Replace with actual client IP
    //     });
    //     console.log("paymentUrl", paymentUrl);
    //     // 3. Return the URL so the frontend can redirect the user
    //     return {
    //       success: true,
    //       orderId: result._id,
    //       paymentUrl: paymentUrl
    //     };
    //   } catch (error) {
    //     console.error('VnPay URL Generation Error:', error);
    //     return {
    //       success: false,
    //       message: "Failed to initialize VnPay payment."
    //     };
    //   }
    // }

    if (formData.paymentMethod === PaymentMethod.VNQR) {
      try {
        // 1. Lấy Use Case từ providers
        const generateQrCodeUseCase = AppProviders.GenerateQrCodeUseCase;

        const roundedAmount = Math.round(order.totalPrice);
        // 2. Thực thi lấy mã QR
        const qrData = await generateQrCodeUseCase.execute(
          result._id || '', 
          roundedAmount
        );

        // 3. Trả về thông tin QR để Frontend hiển thị Modal thanh toán
        return {
          success: true,
          orderId: result._id,
          paymentMethod: PaymentMethod.VNQR,
          qrData: qrData // Chứa { qrUrl, description }
        };
      } catch (error) {
        console.error('VietQR Generation Error:', error);
        return {
          success: false,
          message: "Không thể tạo mã QR thanh toán."
        };
      }
    }
    return { success: true, orderId: result._id };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Order creation error:", error);
    return {
      success: false,
      message: error.message || "Failed to place order"
    };
  }
}

export async function getMyOrdersAction(userId: string): Promise<{ success: boolean; data?: OrderEntity[]; message?: string }> {
  try {
    // Note: You might need to add a "GetOrdersByUserIdUseCase" if it doesn't exist, 
    // or filter the GetAllOrders result.
    const allOrders = await AppProviders.GetAllOrdersUseCase.execute();
    const userOrders = allOrders.filter(order => order.userId === userId);

    return { success: true, data: JSON.parse(JSON.stringify(userOrders)) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getOrderByIdAction(id: string): Promise<{ success: boolean; data?: OrderEntity; message?: string }> {
  try {
    const order = await AppProviders.GetOrderUseCase.execute(id);
    return { success: true, data: JSON.parse(JSON.stringify(order)) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}