import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UsageRepository } from "../../domain/repositories/usage.repository";
import { Usage } from "../../domain/entities/usage.entity";

@Injectable()
export class PrismaUsageRepository implements UsageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(usage: Usage): Promise<Usage> {
    const created = await this.prisma.usage.create({
      data: {
        id: usage.id,
        prompt: usage.prompt,
        response: usage.response,
        createdAt: usage.createdAt,
        userId: usage.userId,
      },
    });
    return new Usage(
      created.id,
      created.prompt,
      created.response,
      created.createdAt,
      created.userId ?? undefined
    );
  }

  async findAll(): Promise<Usage[]> {
    const usages = await this.prisma.usage.findMany();
    return usages.map(
      (u) => new Usage(u.id, u.prompt, u.response, u.createdAt, u.userId ?? undefined)
    );
  }
}
