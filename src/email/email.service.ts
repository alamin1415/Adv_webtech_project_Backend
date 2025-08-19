import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailer: MailerService) {}

  async sendWelcomeEmail(to: string, name?: string) {
    const subject = 'Welcome to Our Laundry!';
    const text =
      `Hi${name ? ' ' + name : ''},\n` +
      `Thanks for joining our laundry service. We’re happy to have you as a member!\n\n` +
      `— Team`;
    // চাইলে htmlও পাঠাতে পারেন
    const html =
      `<h2>Hi${name ? ' ' + name : ''}, 👋</h2>` +
      `<p>Thanks for joining our laundry service. We’re happy to have you as a member!</p>` +
      `<p>— Team</p>`;

    await this.mailer.sendMail({ to, subject, text, html });
  }

  // (অপশনাল) লগইন নোটিফিকেশন
  async sendLoginNotice(to: string, name?: string) {
    await this.mailer.sendMail({
      to,
      subject: 'Login Successful',
      text: `Hello${name ? ' ' + name : ''}, you’ve just logged in to your laundry account.`,
    });
  }
}
