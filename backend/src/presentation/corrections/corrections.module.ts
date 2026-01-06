import { Module } from '@nestjs/common';
import { CorrectionsController } from './corrections.controller';
import { CorrectTextUseCase } from '../../application/correct-text.usecase';
import { AiService } from '../../domain/services/ai.service';
import { GeminiService } from '../../infrastructure/services/gemini.service';
import { CorrectionRepository } from '../../domain/repositories/correction.repository';
import { PrismaCorrectionRepository } from '../../infrastructure/repositories/prisma-correction.repository';
import { AnonymousUsageRepository } from '../../domain/repositories/anonymous-usage.repository';
import { PrismaAnonymousUsageRepository } from '../../infrastructure/repositories/prisma-anonymous-usage.repository';
import { PrismaService } from '../../infrastructure/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [CorrectionsController],
  providers: [
    CorrectTextUseCase,
    PrismaService,
    { provide: AiService, useClass: GeminiService },
    { provide: CorrectionRepository, useClass: PrismaCorrectionRepository },
    { provide: AnonymousUsageRepository, useClass: PrismaAnonymousUsageRepository },
  ],
})
export class CorrectionsModule { }
