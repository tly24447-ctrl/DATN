'use server';

import { OrderEntity, OrderItem } from "@/src/domain/entity/order.entity";
import { VoucherEntity } from "@/src/domain/entity/voucher.entity";
import { AppProviders } from "@/src/provider/provider";

export async function createOrderAction(formData: {
  userId: string;
  voucher?: VoucherEntity | null;
  orderItems: OrderItem[];
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}) {
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

    // 1. Update Product Stock
    for (const item of formData.orderItems) {
      // Fetch current product to get latest countInStock
      const product = await AppProviders.GetProductUseCase.execute(item.productId);
      
      if (!product) {
        throw new Error(`Product ${item.name} not found`);
      }

      const newStock = (product.countInStock || 0) - item.amount;

      if (newStock < 0) {
        throw new Error(`Insufficient stock for ${item.name}`);
      }

      // Update the product stock in DB
      await AppProviders.UpdateProductUseCase.execute(item.productId, {
        countInStock: newStock
      });
      
      console.log(`Updated stock for ${item.name}: ${newStock}`);
    }

    // 2. Update Voucher count if applicable
    if (formData.voucher && formData.voucher._id) {
      const currentCount = formData.voucher.usedCount || 0;
      console.log(`Updating voucher ${formData.voucher._id}. Current count: ${currentCount}`);

      await AppProviders.UpdateVoucherUseCase.execute(
        formData.voucher._id,
        { usedCount: currentCount + 1 }
      );
    }

    // 3. Create the order
    const result = await AppProviders.CreateOrderUseCase.execute(order);

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