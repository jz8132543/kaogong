import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_stats')
export class UserStat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  user_id: string;

  // 记录哪一天的统计数据（用于绘制热力图），格式 YYYY-MM-DD
  @Column({ type: 'date' })
  stat_date: string;

  @Column({ type: 'int', default: 0 })
  questions_answered: number;

  @Column({ type: 'int', default: 0 })
  correct_count: number;

  // 记录每个知识点/题型的掌握度，格式如 {"行测-图形推理": { attempted: 10, correct: 8 }}
  @Column({ type: 'jsonb', nullable: true })
  tag_mastery: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
