import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pledge_contracts')
export class PledgeContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  user_id: string;

  @Column({ type: 'int', default: 0 })
  amount: number; // 押金金额 (分)

  @Column({ type: 'int', default: 30 })
  target_days: number; // 目标打卡天数

  @Column({ type: 'int', default: 0 })
  completed_days: number; // 已打卡天数

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string; // PENDING, ACTIVE, COMPLETED, FAILED, REFUNDED

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
