import { CategoryRepositoryImpl } from '@/src/data/repository/category.repository.impl';
import { OrderRepositoryImpl } from '@/src/data/repository/order.repository.impl';
import { ProductRepositoryImpl } from '@/src/data/repository/product.repository.impl';
import { UserRepositoryImpl } from '@/src/data/repository/user.repository.impl';
import { VoucherRepositoryImpl } from '@/src/data/repository/voucher.repository.impl';

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUsersByPageUseCase,
  GetUserUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase
} from '@/src/domain/use-case/user.use-case';

import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  GetCategoriesByPageUseCase,
  GetCategoryUseCase,
  SearchCategoriesUseCase,
  UpdateCategoryUseCase
} from '@/src/domain/use-case/category.use-case';

import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  GetAllOrdersUseCase,
  GetOrdersByPageUseCase,
  GetOrderUseCase,
  SearchOrdersUseCase,
  UpdateOrderUseCase
} from '@/src/domain/use-case/order.use-case';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductsByPageUseCase,
  GetProductUseCase,
  SearchProductsUseCase,
  UpdateProductUseCase
} from '@/src/domain/use-case/product.use-case';

import { VnPayRepositoryImpl } from '@/src/data/repository/vn-pay.repository.impl';
import { CreateVnPayUrlUseCase, VerifyVnPayPaymentUseCase } from '@/src/domain/use-case/vn-pay.use-case';
import {
  CreateVoucherUseCase,
  DeleteVoucherUseCase,
  GetAllVouchersUseCase,
  GetVouchersByPageUseCase,
  GetVoucherUseCase,
  SearchVouchersUseCase,
  UpdateVoucherUseCase
} from '@/src/domain/use-case/voucher.use-case';
import { PaymentRepositoryImpl } from '../data/repository/payment.repository.impl';
import { GenerateQrCodeUseCase, HandleWebhookUseCase } from '../domain/use-case/payement.use-case';

// --- Repository Instantiation ---
const userRepository = new UserRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();
const orderRepository = new OrderRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const voucherRepository = new VoucherRepositoryImpl();
const vnPayRepository = new VnPayRepositoryImpl();
const paymentRepository = new PaymentRepositoryImpl();

export const AppProviders = {
  // --- User Domain ---
  UserRepository: userRepository,
  CreateUserUseCase: new CreateUserUseCase(userRepository),
  GetAllUsersUseCase: new GetAllUsersUseCase(userRepository),
  GetUserUseCase: new GetUserUseCase(userRepository),
  UpdateUserUseCase: new UpdateUserUseCase(userRepository),
  DeleteUserUseCase: new DeleteUserUseCase(userRepository),
  GetUserByEmailUseCase: new GetUserByEmailUseCase(userRepository),
  GetUsersByPageUseCase: new GetUsersByPageUseCase(userRepository),
  SearchUsersUseCase: new SearchUsersUseCase(userRepository),

  // --- Category Domain ---
  CategoryRepository: categoryRepository,
  CreateCategoryUseCase: new CreateCategoryUseCase(categoryRepository),
  GetAllCategoriesUseCase: new GetAllCategoriesUseCase(categoryRepository),
  GetCategoryUseCase: new GetCategoryUseCase(categoryRepository),
  UpdateCategoryUseCase: new UpdateCategoryUseCase(categoryRepository),
  DeleteCategoryUseCase: new DeleteCategoryUseCase(categoryRepository),
  GetCategoriesByPageUseCase: new GetCategoriesByPageUseCase(categoryRepository),
  SearchCategoriesUseCase: new SearchCategoriesUseCase(categoryRepository),

  // --- Order Domain ---
  OrderRepository: orderRepository,
  CreateOrderUseCase: new CreateOrderUseCase(orderRepository),
  GetAllOrdersUseCase: new GetAllOrdersUseCase(orderRepository),
  GetOrderUseCase: new GetOrderUseCase(orderRepository),
  UpdateOrderUseCase: new UpdateOrderUseCase(orderRepository),
  DeleteOrderUseCase: new DeleteOrderUseCase(orderRepository),
  GetOrdersByPageUseCase: new GetOrdersByPageUseCase(orderRepository),
  SearchOrdersUseCase: new SearchOrdersUseCase(orderRepository),

  // --- Product Domain ---
  ProductRepository: productRepository,
  CreateProductUseCase: new CreateProductUseCase(productRepository),
  GetAllProductsUseCase: new GetAllProductsUseCase(productRepository),
  GetProductUseCase: new GetProductUseCase(productRepository),
  UpdateProductUseCase: new UpdateProductUseCase(productRepository),
  DeleteProductUseCase: new DeleteProductUseCase(productRepository),
  GetProductsByPageUseCase: new GetProductsByPageUseCase(productRepository),
  SearchProductsUseCase: new SearchProductsUseCase(productRepository),

  // --- Voucher Domain ---
  VoucherRepository: voucherRepository,
  CreateVoucherUseCase: new CreateVoucherUseCase(voucherRepository),
  GetAllVouchersUseCase: new GetAllVouchersUseCase(voucherRepository),
  GetVoucherUseCase: new GetVoucherUseCase(voucherRepository),
  UpdateVoucherUseCase: new UpdateVoucherUseCase(voucherRepository),
  DeleteVoucherUseCase: new DeleteVoucherUseCase(voucherRepository),
  GetVouchersByPageUseCase: new GetVouchersByPageUseCase(voucherRepository),
  SearchVouchersUseCase: new SearchVouchersUseCase(voucherRepository),

  // --- Vnpay domain ---
  VnPayRepository: vnPayRepository,
  CreateVnPayUrlUseCase: new CreateVnPayUrlUseCase(vnPayRepository),
  VerifyVnPayPaymentUseCase: new VerifyVnPayPaymentUseCase(vnPayRepository),

  // --- Payment domain ---
  PaymentRepository: paymentRepository,
  GenerateQrCodeUseCase: new GenerateQrCodeUseCase(paymentRepository),
  HandleWebhookUseCase: new HandleWebhookUseCase(paymentRepository),
};
