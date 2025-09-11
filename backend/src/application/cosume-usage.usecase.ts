import { UsageRepository } from '../domain/repositories/usage.repository';
import { Usage } from '../domain/entities/usage.entity';

export class ConsumeUsageUseCase {
  constructor(private usageRepository: UsageRepository) {}

  async execute(userId: string | null): Promise<{ allowed: boolean }> {
    if (!userId) {
      const count = await this.usageRepository.countByUserId(null);
      if (count >= 5) {
        return { allowed: false };
      }
    }
    const usage = new Usage(crypto.randomUUID(), userId, new Date());
    await this.usageRepository.create(usage);
    return { allowed: true };
  }
}
