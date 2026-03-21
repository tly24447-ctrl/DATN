// backend/src/presentation/gateways/payment.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // Cấu hình CORS để React gọi được
export class PaymentGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinOrderRoom')
  handleJoinRoom(client: Socket, orderId: string) {
    void client.join(orderId);
    console.log(`Client ${client.id} joined room: ${orderId}`);
  }
}
