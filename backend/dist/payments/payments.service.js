"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pledge_entity_1 = require("../entities/pledge.entity");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    pledgeRepository;
    logger = new common_1.Logger(PaymentsService_1.name);
    constructor(pledgeRepository) {
        this.pledgeRepository = pledgeRepository;
    }
    async createPledgeOrder(userId, amount, targetDays) {
        this.logger.log(`Creating pledge order for user ${userId} amount ${amount} target ${targetDays}`);
        const pledge = this.pledgeRepository.create({
            user_id: userId,
            amount,
            target_days: targetDays,
            status: 'PENDING'
        });
        await this.pledgeRepository.save(pledge);
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
    async handlePaymentCallback(pledgeId) {
        this.logger.log(`Received payment callback for pledge ${pledgeId}`);
        const pledge = await this.pledgeRepository.findOne({ where: { id: pledgeId } });
        if (pledge) {
            pledge.status = 'ACTIVE';
            await this.pledgeRepository.save(pledge);
            return { success: true, message: '合约已生效' };
        }
        return { success: false, message: '合约未找到' };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pledge_entity_1.PledgeContract)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map