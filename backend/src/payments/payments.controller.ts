import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pledge/create')
  async createPledge(@Body() body: { userId: string; amount: number; targetDays: number }) {
    return this.paymentsService.createPledgeOrder(body.userId, body.amount, body.targetDays);
  }

  @Post('webhook/wechat')
  async wechatCallback(@Body() body: { pledgeId: string }) {
    // 实际业务中这里是微信服务器推送的密文，需要验签解密
    return this.paymentsService.handlePaymentCallback(body.pledgeId);
  }
}
