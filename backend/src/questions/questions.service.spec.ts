import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { Question } from '../entities/question.entity';
import { TeacherSkill } from '../entities/teacher-skill.entity';
import { QuestionAnalysis } from '../entities/question-analysis.entity';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Question, TeacherSkill, QuestionAnalysis],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Question, TeacherSkill, QuestionAnalysis]),
      ],
      providers: [QuestionsService],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should save a question with JSONB multi-modal options', async () => {
    const question = await service.createQuestion({
      content: '测试题干，包含一张图',
      media_assets: { images: ['http://localhost/uploads/img1.png'] },
      options: { A: '选项1', B: '选项2' },
      correct_answer: 'A',
      tags: ['技巧1', '易错点']
    });

    expect(question.id).toBeDefined();
    expect(question.media_assets.images[0]).toBe('http://localhost/uploads/img1.png');
  });
});
