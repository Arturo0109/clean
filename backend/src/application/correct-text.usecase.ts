
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AiService } from '../domain/services/ai.service';
import { CorrectionRepository } from '../domain/repositories/correction.repository';
import { AnonymousUsageRepository } from '../domain/repositories/anonymous-usage.repository';

@Injectable()
export class CorrectTextUseCase {
    constructor(
        private readonly aiService: AiService,
        private readonly correctionRepository: CorrectionRepository,
        private readonly anonymousUsageRepository: AnonymousUsageRepository,
    ) { }

    async execute(params: { userId?: string; sessionId?: string; text: string }) {
        let remainingAttempts: number | undefined;

        // 1.  verificar permisos para usuarios anónimos
        if (!params.userId && params.sessionId) {
            let usage = await this.anonymousUsageRepository.findBySessionId(params.sessionId);

            if (!usage) {
                usage = await this.anonymousUsageRepository.create(params.sessionId);
            }

            if (usage.remaining <= 0) {
                throw new ForbiddenException('Se acabaron tus intentos gratuitos. Regístrate para continuar.');
            }
            remainingAttempts = usage.remaining;
        }

        // 2. corregir texto
        const corrected = await this.aiService.correctText(params.text);

        // 3. guardar y actualizar
        if (params.userId) {
            await this.correctionRepository.create({
                text: params.text,
                corrected,
                userId: params.userId
            });
        } else if (params.sessionId) {
            const updated = await this.anonymousUsageRepository.consume(params.sessionId);
            remainingAttempts = updated.remaining;
        }

        return {
            corrected,
            remaining: remainingAttempts
        };
    }
}
