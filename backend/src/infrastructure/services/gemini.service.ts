
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AiService } from '../../domain/services/ai.service';

@Injectable()
export class GeminiService implements AiService {
    constructor(private configService: ConfigService) { }

    async correctText(text: string): Promise<string> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            // Fallback for development if env is not loaded correctly or just to be safe
            console.warn('GEMINI_API_KEY not found in ConfigService');
        }

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
                {
                    contents: [{ parts: [{ text: `Corrige el siguiente texto (gramática, ortografía y estilo), devuelve SOLO el texto corregido sin explicaciones ni comillas:\n\n${text}` }] }],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    params: { key: apiKey || process.env.GEMINI_API_KEY },
                },
            );

            const corrected =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

            if (!corrected) throw new Error('No se recibió respuesta válida de Gemini');
            return corrected;
        } catch (error) {
            console.error('Gemini API Error:', error?.response?.data || error.message);
            throw new BadRequestException('Error al conectar con el servicio de IA');
        }
    }
}
