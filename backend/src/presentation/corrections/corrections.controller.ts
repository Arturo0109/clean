import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CorrectTextUseCase } from '../../application/correct-text.usecase';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import * as crypto from 'crypto';

@Controller('corrections')
export class CorrectionsController {
  constructor(private correctTextUseCase: CorrectTextUseCase) { }

  @Post('anonymous')
  async correctAnonymous(@Req() req: Request, @Body() body: { text: string }) {
    const sessionId =
      req.cookies?.sessionId ||
      req.headers['x-session-id']?.toString() ||
      crypto.randomUUID();

    return this.correctTextUseCase.execute({
      sessionId,
      text: body.text
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('registered')
  async correctRegistered(@Req() req: any, @Body() body: { text: string }) {
    const userId = req.user.userId;
    return this.correctTextUseCase.execute({
      userId,
      text: body.text
    });
  }
}
