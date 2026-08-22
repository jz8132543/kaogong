import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { TeacherSkill } from '../entities/teacher-skill.entity';
import { QuestionAnalysis } from '../entities/question-analysis.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(TeacherSkill)
    private skillsRepository: Repository<TeacherSkill>,
    @InjectRepository(QuestionAnalysis)
    private analysisRepository: Repository<QuestionAnalysis>,
  ) {}

  async createQuestion(data: Partial<Question>): Promise<Question> {
    const question = this.questionsRepository.create(data);
    return this.questionsRepository.save(question);
  }

  async findAll(tags?: string[]): Promise<Question[]> {
    const query = this.questionsRepository.createQueryBuilder('q')
      .leftJoinAndSelect('q.analyses', 'a')
      .leftJoinAndSelect('a.teacherSkill', 's');
      
    if (tags && tags.length > 0) {
      // Postgres JSONB 包含查询: `tags ?| array['tag1', 'tag2']`
      // TypeORM 处理 JSONB 数组交集略复杂，这里用简单的 Like 模糊模拟或直接返回全量
      // (为避免 MVP 环境数据库方言问题，这里简写处理)
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Question | null> {
    return this.questionsRepository.findOne({
      where: { id },
      relations: {
        analyses: {
          teacherSkill: true
        }
      }
    });
  }
  
  async addAnalysis(questionId: string, skillId: string, content: any, tokenCost: number): Promise<QuestionAnalysis> {
    const question = await this.questionsRepository.findOneBy({ id: questionId });
    const skill = await this.skillsRepository.findOneBy({ id: skillId });
    if (!question || !skill) throw new Error('Question or Skill not found');

    const analysis = this.analysisRepository.create({
      question,
      teacherSkill: skill,
      analysis_content: content,
      token_cost: tokenCost
    });
    
    return this.analysisRepository.save(analysis);
  }
}
