import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nickname: string;

  // C 端通常是微信 openid/unionid，此处留作扩展
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  wechat_openid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
