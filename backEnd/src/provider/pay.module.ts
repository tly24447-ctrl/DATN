import { VnPayController } from '@/src/presentation/controllers/vn-pay.controller';
import { VnPayService } from '@/src/presentation/services/vn-pay.service';
import { Module } from '@nestjs/common';
import { OrderModule } from './order.module';
import { PaymentController } from '../presentation/controllers/payment.controller';
import { PaymentService } from '../presentation/services/payment.service';
import { PaymentGateway } from '../presentation/gateways/payment.gateway';

@Module({
  imports: [OrderModule],
  controllers: [VnPayController, PaymentController],
  providers: [VnPayService, PaymentService, PaymentGateway],
  exports: [VnPayService, PaymentService, PaymentGateway], // Export if other modules need to generate URLs
})
export class VnPayModule {}
