import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStat } from '../entities/user_stats.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(UserStat)
    private statsRepository: Repository<UserStat>
  ) {}

  /**
   * 记录一次做题结果（由前端交卷时调用）
   */
  async recordAnswer(userId: string, isCorrect: boolean, tags: string[]) {
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

    // 更新各技能粒度的掌握度
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

  /**
   * 获取用户整年的学习热力图数据
   */
  async getHeatmap(userId: string) {
    // 实际业务中可根据年份过滤
    return this.statsRepository.find({
      where: { user_id: userId },
      select: { stat_date: true, questions_answered: true, correct_count: true },
      order: { stat_date: 'ASC' }
    });
  }
}
