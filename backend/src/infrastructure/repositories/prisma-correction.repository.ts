
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CorrectionRepository } from '../../domain/repositories/correction.repository';
import { Correction } from '../../domain/entities/correction.entity';

@Injectable()
export class PrismaCorrectionRepository implements CorrectionRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: { text: string; corrected: string; userId: string }): Promise<Correction> {
        const result = await this.prisma.correction.create({
            data,
        });

        return new Correction({
            ...result,
            userId: result.userId ?? undefined,
        });
    }
}
