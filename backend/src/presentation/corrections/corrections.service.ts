import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma.service';
import axios from 'axios';

@Injectable()
export class CorrectionsService {
  constructor(private prisma: PrismaService) {}

  private async callGeminiAPI(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [{ parts: [{ text }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: { key: process.env.GEMINI_API_KEY },
        },
      );

      const corrected =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

      if (!corrected) throw new Error('No se recibió respuesta válida de Gemini');
      return corrected;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al conectar con Gemini API');
    }
  }

  async correctAnonymous(sessionId: string, text: string) {
    let anon = await this.prisma.anonymousUsage.findUnique({
      where: { sessionId },
    });

    if (!anon) {
      anon = await this.prisma.anonymousUsage.create({
        data: { sessionId },
      });
    }

    if (anon.remaining <= 0) {
      throw new ForbiddenException(
        'Se acabaron tus intentos gratuitos. Regístrate para seguir usando el corrector.',
      );
    }

    const corrected = await this.callGeminiAPI(text);

    await this.prisma.anonymousUsage.update({
      where: { sessionId },
      data: { remaining: anon.remaining - 1 },
    });

    return { corrected, remaining: anon.remaining - 1 };
  }

  async correctRegistered(userId: string, text: string) {
    const corrected = await this.callGeminiAPI(text);

    await this.prisma.correction.create({
      data: {
        text,
        corrected,
        userId,
      },
    });

    return { corrected };
  }
}
