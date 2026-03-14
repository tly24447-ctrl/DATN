// backend/src/presentation/gateways/payment.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@WebSocketGateway({ cors: { origin: '*' } }) // Cấu hình CORS để React gọi được
export class PaymentGateway {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @WebSocketServer()
  server: Server;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @SubscribeMessage('joinOrderRoom')
  handleJoinRoom(client: Socket, orderId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    client.join(orderId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`Client ${client.id} joined room: ${orderId}`);
  }
}
