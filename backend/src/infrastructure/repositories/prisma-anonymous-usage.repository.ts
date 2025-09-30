// src/infrastructure/repositories/prisma-anonymous-usage.repository.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import type { AnonymousUsageRepository } from "../../domain/repositories/anonymous-usage.repository";
import { AnonymousUsage } from "../../domain/entities/anonymous-usage.entity";

@Injectable()
export class PrismaAnonymousUsageRepository
  implements AnonymousUsageRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(sessionId: string): Promise<AnonymousUsage> {
    const usage = await this.prisma.anonymousUsage.create({
      data: { sessionId },
    });

    return new AnonymousUsage(
      usage.id,
      usage.sessionId,
      usage.remaining,
      usage.createdAt
    );
  }

  async findBySessionId(sessionId: string): Promise<AnonymousUsage | null> {
    const usage = await this.prisma.anonymousUsage.findUnique({
      where: { sessionId },
    });

    return usage
      ? new AnonymousUsage(
          usage.id,
          usage.sessionId,
          usage.remaining,
          usage.createdAt
        )
      : null;
  }

  async consume(sessionId: string): Promise<AnonymousUsage> {
    const usage = await this.prisma.anonymousUsage.update({
      where: { sessionId },
      data: { remaining: { decrement: 1 } },
    });

    return new AnonymousUsage(
      usage.id,
      usage.sessionId,
      usage.remaining,
      usage.createdAt
    );
  }
}
