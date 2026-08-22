import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PledgeContract } from '../entities/pledge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PledgeContract])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
