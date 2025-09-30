// src/application/consume-usage.usecase.ts
import { Injectable } from "@nestjs/common";
import type { AnonymousUsageRepository } from "../domain/repositories/anonymous-usage.repository";
import type { UsageRepository } from "../domain/repositories/usage.repository";

@Injectable()
export class ConsumeUsageUseCase {
  constructor(
    private readonly usageRepository: UsageRepository,
    private readonly anonymousUsageRepository: AnonymousUsageRepository
  ) {}

  async execute(params: {
    userId?: string;
    sessionId?: string;
  }): Promise<{ success: boolean; remaining?: number; message: string }> {
    // 🔹 Caso 1: Usuario registrado → ilimitado
    if (params.userId) {
      return {
        success: true,
        message: "Usuario registrado, uso ilimitado",
      };
    }

    // 🔹 Caso 2: Usuario anónimo → controlar intentos
    if (params.sessionId) {
      let usage = await this.anonymousUsageRepository.findBySessionId(
        params.sessionId
      );

      if (!usage) {
        usage = await this.anonymousUsageRepository.create(params.sessionId);
      }

      if (usage.remaining <= 0) {
        return {
          success: false,
          remaining: 0,
          message:
            "Se acabaron los intentos gratuitos. Regístrate para continuar.",
        };
      }

      const updated = await this.anonymousUsageRepository.consume(
        params.sessionId
      );

      return {
        success: true,
        remaining: updated.remaining,
        message: `Intento consumido. Te quedan ${updated.remaining}.`,
      };
    }

    return {
      success: false,
      message: "No se proporcionó identidad de usuario o sesión.",
    };
  }
}
