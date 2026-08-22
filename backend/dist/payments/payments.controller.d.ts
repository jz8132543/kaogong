import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPledge(body: {
        userId: string;
        amount: number;
        targetDays: number;
    }): Promise<{
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
    wechatCallback(body: {
        pledgeId: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
