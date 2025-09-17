import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher'; // ✅ ES Module import

@Injectable()
export class PusherService {
  private pusher: any;

  constructor() {
    this.pusher = new (Pusher as any)({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    });
  }

  async triggerOrderNotification(order: any) {
    await this.pusher.trigger('orders', 'order-placed', order);
  }
}
