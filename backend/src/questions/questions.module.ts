import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { TeacherSkill } from '../entities/teacher-skill.entity';
import { QuestionAnalysis } from '../entities/question-analysis.entity';
import { QuestionsService } from './questions.service';

import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, TeacherSkill, QuestionAnalysis])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
