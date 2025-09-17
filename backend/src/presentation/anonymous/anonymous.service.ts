import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';
import { UseDto } from './dto/use.dto';
import { AnonymousUsage } from '../../domain/anonymous-usage.entity';

@Injectable()
export class AnonymousService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea un registro de uso anónimo con 5 intentos iniciales
   */
  async createSession(sessionId: string): Promise<AnonymousUsage> {
    const existing = await this.prisma.anonymousUsage.findUnique({
      where: { sessionId },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.anonymousUsage.create({
      data: {
        sessionId,
        remaining: 5,
      },
    });
  }

  /**
   * Resta un uso al usuario anónimo
   */
  async useCorrector(dto: UseDto): Promise<{ remaining: number }> {
    const session = await this.prisma.anonymousUsage.findUnique({
      where: { sessionId: dto.sessionId },
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    if (session.remaining <= 0) {
      throw new BadRequestException('Ya no tienes usos disponibles, regístrate');
    }

    const updated = await this.prisma.anonymousUsage.update({
      where: { sessionId: dto.sessionId },
      data: { remaining: { decrement: 1 } },
    });

    return { remaining: updated.remaining };
  }

  /**
   * Obtiene el estado actual de la sesión
   */
  async getRemaining(sessionId: string): Promise<{ remaining: number }> {
    const session = await this.prisma.anonymousUsage.findUnique({
      where: { sessionId },
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    return { remaining: session.remaining };
  }
}
