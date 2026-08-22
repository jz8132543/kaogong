import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('record')
  async recordAnswer(@Body() body: { userId: string; isCorrect: boolean; tags: string[] }) {
    return this.statsService.recordAnswer(body.userId, body.isCorrect, body.tags || []);
  }

  @Get('heatmap/:userId')
  async getHeatmap(@Param('userId') userId: string) {
    return this.statsService.getHeatmap(userId);
  }
}
