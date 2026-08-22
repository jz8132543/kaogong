import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './entities/user.entity';
import { Question } from './entities/question.entity';
import { TeacherSkill } from './entities/teacher-skill.entity';
import { QuestionAnalysis } from './entities/question-analysis.entity';
import { PledgeContract } from './entities/pledge.entity';
import { UserStat } from './entities/user_stats.entity';

import { QuestionsModule } from './questions/questions.module';
import { SkillsModule } from './skills/skills.module';
import { AnalysisModule } from './analysis/analysis.module';
import { PaymentsModule } from './payments/payments.module';
import { StatsModule } from './stats/stats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'kaogong_user',
      password: 'kaogong_password',
      database: 'kaogong_db',
      entities: [User, Question, TeacherSkill, QuestionAnalysis, PledgeContract, UserStat],
      synchronize: true, // DEV ONLY
    }),
    QuestionsModule,
    SkillsModule,
    AnalysisModule,
    PaymentsModule,
    StatsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
