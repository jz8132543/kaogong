import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { QuestionAnalysis } from './question-analysis.entity';

@Entity('teacher_skills')
export class TeacherSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  style_description: string;

  @Column({ type: 'text' })
  prompt_template: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  external_source_url: string;

  @Column({ type: 'timestamp', nullable: true })
  last_synced_at: Date;

  @OneToMany(() => QuestionAnalysis, analysis => analysis.teacherSkill)
  analyses: QuestionAnalysis[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
