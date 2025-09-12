import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UsageRepository } from "../../../domain/repositories/usage.repository";
import { Usage } from "../../../domain/entities/usage.entity";


@Injectable()
export class UsagePrismaRepository implements UsageRepository {
    constructor(private readonly prisma: PrismaService) { }
    async countByUserId(userId: string | null): Promise<number> {
        return this.prisma.usage.count({
            where: { userId },
        });
    }

    async create(usage: Usage): Promise<Usage> {
        const created = await this.prisma.usage.create({
            data: {
                id: usage.id,
                  userId: usage.userId,
            },
        });
        return new Usage(created.id, created.userId, created.createdAt);
    }

    async findByUserId(userId: string | null): Promise<number> {
        const count = await this.prisma.usage.count({
            where: { userId },
        });
        return count;
    }
}
