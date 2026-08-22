import { Controller, Get, Post, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('api/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }

  @Post('sync')
  async syncSkill(@Body() body: { url: string; name: string }) {
    if (!body.url || !body.name) {
      throw new Error('URL and name are required');
    }
    return this.skillsService.syncFromExternal(body.url, body.name);
  }
}
