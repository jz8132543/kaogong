import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './question.entity';
import { TeacherSkill } from './teacher-skill.entity';

@Entity('question_analyses')
export class QuestionAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, question => question.analyses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => TeacherSkill, skill => skill.analyses, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teacher_skill_id' })
  teacherSkill: TeacherSkill;

  // 解析详情（支持图文多模态，以 JSONB 存储）
  @Column({ type: 'jsonb' })
  analysis_content: any;

  @Column({ type: 'int', default: 0 })
  token_cost: number;

  @CreateDateColumn()
  created_at: Date;
}
