import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    recordAnswer(body: {
        userId: string;
        isCorrect: boolean;
        tags: string[];
    }): Promise<import("../entities/user_stats.entity").UserStat>;
    getHeatmap(userId: string): Promise<import("../entities/user_stats.entity").UserStat[]>;
}
