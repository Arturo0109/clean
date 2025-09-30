import { Usage } from "../entities/usage.entity";

export interface UsageRepository {
  save(usage: Usage): Promise<Usage>;
  findAll(): Promise<Usage[]>;
}
