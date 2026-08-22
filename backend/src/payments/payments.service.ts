import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PledgeContract } from '../entities/pledge.entity';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(PledgeContract)
    private pledgeRepository: Repository<PledgeContract>
  ) {}

  /**
   * 模拟生成微信支付预下单
   */
  async createPledgeOrder(userId: string, amount: number, targetDays: number) {
    this.logger.log(`Creating pledge order for user ${userId} amount ${amount} target ${targetDays}`);
    
    // 1. 创建待支付的合约
    const pledge = this.pledgeRepository.create({
      user_id: userId,
      amount,
      target_days: targetDays,
      status: 'PENDING'
    });
    await this.pledgeRepository.save(pledge);

    // 2. 模拟微信支付统一下单，返回一个假支付参数让前端拉起收银台
    return {
      success: true,
      pledgeId: pledge.id,
      paymentParams: {
        appId: 'wx_mock_appid',
        timeStamp: Date.now().toString(),
        nonceStr: 'mock_nonce',
        package: 'prepay_id=mock_prepay_123',
        signType: 'RSA',
        paySign: 'mock_sign'
      }
    };
  }

  /**
   * 模拟微信支付回调
   */
  async handlePaymentCallback(pledgeId: string) {
    this.logger.log(`Received payment callback for pledge ${pledgeId}`);
    const pledge = await this.pledgeRepository.findOne({ where: { id: pledgeId } });
    if (pledge) {
      pledge.status = 'ACTIVE';
      await this.pledgeRepository.save(pledge);
      return { success: true, message: '合约已生效' };
    }
    return { success: false, message: '合约未找到' };
  }
}
