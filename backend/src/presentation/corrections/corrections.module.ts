import { Module } from '@nestjs/common';
import { CorrectionsService } from './corrections.service';
import { CorrectionsController } from './corrections.controller';
import { PrismaService } from '../../infrastructure/prisma.service';

@Module({
  controllers: [CorrectionsController],
  providers: [CorrectionsService, PrismaService],
})
export class CorrectionsModule {}
