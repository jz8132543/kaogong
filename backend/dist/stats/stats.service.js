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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_stats_entity_1 = require("../entities/user_stats.entity");
let StatsService = class StatsService {
    statsRepository;
    constructor(statsRepository) {
        this.statsRepository = statsRepository;
    }
    async recordAnswer(userId, isCorrect, tags) {
        const today = new Date().toISOString().split('T')[0];
        let stat = await this.statsRepository.findOne({
            where: { user_id: userId, stat_date: today }
        });
        if (!stat) {
            stat = this.statsRepository.create({
                user_id: userId,
                stat_date: today,
                tag_mastery: {}
            });
        }
        stat.questions_answered += 1;
        if (isCorrect) {
            stat.correct_count += 1;
        }
        const tagMastery = stat.tag_mastery || {};
        tags.forEach(tag => {
            if (!tagMastery[tag]) {
                tagMastery[tag] = { attempted: 0, correct: 0 };
            }
            tagMastery[tag].attempted += 1;
            if (isCorrect) {
                tagMastery[tag].correct += 1;
            }
        });
        stat.tag_mastery = tagMastery;
        return this.statsRepository.save(stat);
    }
    async getHeatmap(userId) {
        return this.statsRepository.find({
            where: { user_id: userId },
            select: { stat_date: true, questions_answered: true, correct_count: true },
            order: { stat_date: 'ASC' }
        });
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_stats_entity_1.UserStat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map