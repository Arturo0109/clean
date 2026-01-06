import { AnonymousUsage } from "../entities/anonymous-usage.entity";

export abstract class AnonymousUsageRepository {
  abstract create(sessionId: string): Promise<AnonymousUsage>;
  abstract findBySessionId(sessionId: string): Promise<AnonymousUsage | null>;
  abstract consume(sessionId: string): Promise<AnonymousUsage>;
}
