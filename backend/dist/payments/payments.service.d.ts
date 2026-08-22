import { Repository } from 'typeorm';
import { PledgeContract } from '../entities/pledge.entity';
export declare class PaymentsService {
    private pledgeRepository;
    private readonly logger;
    constructor(pledgeRepository: Repository<PledgeContract>);
    createPledgeOrder(userId: string, amount: number, targetDays: number): Promise<{
        success: boolean;
        pledgeId: string;
        paymentParams: {
            appId: string;
            timeStamp: string;
            nonceStr: string;
            package: string;
            signType: string;
            paySign: string;
        };
    }>;
    handlePaymentCallback(pledgeId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
