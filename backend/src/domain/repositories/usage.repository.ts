import { Usage } from '../entities/usage.entity';

export interface UsageRepository {
  create(usage: Usage): Promise<Usage>;
  countByUserId(userId: string | null): Promise<number>;
}
