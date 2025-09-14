import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ConsumeUsageUseCase } from 'src/application/cosume-usage.usecase';
import { UsagePrismaRepository } from 'src/infrastructure/prisma/repositories/usage.prisma.respository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Controller('usage')
export class UsageController {
    private readonly consumeUsage: ConsumeUsageUseCase;

    constructor(private readonly prisma: PrismaService) {
        const usageRepo = new UsagePrismaRepository(prisma);
        this.consumeUsage = new ConsumeUsageUseCase(usageRepo);

    }
    @Post('consume')
    async consume(@Req() req: any) {
        const userId = req.user ? req.user.id : null;

        const result = await this.consumeUsage.execute(userId);
        return result;

    }
} 