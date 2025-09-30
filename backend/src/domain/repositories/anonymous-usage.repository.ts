import { AnonymousUsage } from "../entities/anonymous-usage.entity";

export interface AnonymousUsageRepository {
  create(sessionId: string): Promise<AnonymousUsage>;
  findBySessionId(sessionId: string): Promise<AnonymousUsage | null>;
  consume(sessionId: string): Promise<AnonymousUsage>;
}
