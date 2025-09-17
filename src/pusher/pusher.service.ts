// backend/src/admin/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as PushNotifications from '@pusher/push-notifications-server';

@Injectable()
export class PusherService {
  private beamsClient: PushNotifications;

  constructor() {
    const instanceId = process.env.PUSHER_INSTANCE_ID;
    const secretKey = process.env.PUSHER_SECRET_KEY;

    if (!instanceId || !secretKey) {
      throw new Error('PUSHER_INSTANCE_ID or PUSHER_SECRET_KEY is missing in .env');
    }

    this.beamsClient = new PushNotifications({
      instanceId,
      secretKey,
    });
  }

  async notifyManagerAdded(managerName: string) {
    await this.beamsClient.publishToInterests(['managers'], {
      web: {
        notification: {
          title: 'New Manager Added',
          body: `Manager ${managerName} has been added.`,
          deep_link: 'http://localhost:4000/managers', // URL to open
        },
      },
    });
  }
}
