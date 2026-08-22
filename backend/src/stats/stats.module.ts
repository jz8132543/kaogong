import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { UserStat } from '../entities/user_stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStat])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
