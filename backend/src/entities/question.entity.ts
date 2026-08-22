import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { QuestionAnalysis } from './question-analysis.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  // 使用 jsonb 存储多模态资源（如图表 URL）
  @Column({ type: 'jsonb', nullable: true })
  media_assets: any;

  // 使用 jsonb 存储选项组合
  @Column({ type: 'jsonb' })
  options: any;

  @Column({ type: 'text' })
  correct_answer: string;

  // 使用 jsonb 存储题目标签
  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @OneToMany(() => QuestionAnalysis, analysis => analysis.question)
  analyses: QuestionAnalysis[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
