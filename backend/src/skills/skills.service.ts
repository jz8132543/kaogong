import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherSkill } from '../entities/teacher-skill.entity';

@Injectable()
export class SkillsService {
  private readonly logger = new Logger(SkillsService.name);

  constructor(
    @InjectRepository(TeacherSkill)
    private readonly skillsRepository: Repository<TeacherSkill>,
  ) {}

  async findAll(): Promise<TeacherSkill[]> {
    return this.skillsRepository.find();
  }

  async syncFromExternal(url: string, name: string): Promise<TeacherSkill> {
    this.logger.log(`Syncing skill [${name}] from ${url}`);
    
    // Node.js 原生 fetch
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch skill from ${url}: ${response.statusText}`);
    }
    
    const promptTemplate = await response.text();
    
    // 查找是否已存在该老师，如果有则更新，没有则创建
    let skill = await this.skillsRepository.findOne({ where: { name } });
    if (!skill) {
      skill = this.skillsRepository.create({
        name,
        prompt_template: promptTemplate,
        style_description: 'Auto synced'
      });
    } else {
      skill.prompt_template = promptTemplate;
      skill.last_synced_at = new Date();
    }

    return this.skillsRepository.save(skill);
  }
}
