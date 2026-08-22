import { Repository } from 'typeorm';
import { UserStat } from '../entities/user_stats.entity';
export declare class StatsService {
    private statsRepository;
    constructor(statsRepository: Repository<UserStat>);
    recordAnswer(userId: string, isCorrect: boolean, tags: string[]): Promise<UserStat>;
    getHeatmap(userId: string): Promise<UserStat[]>;
}
