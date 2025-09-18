import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CorrectionsService } from './corrections.service';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('corrections')
export class CorrectionsController {
  constructor(private correctionsService: CorrectionsService) {}

  @Post('anonymous')
  async correctAnonymous(@Req() req: Request, @Body() body: { text: string }) {
    const sessionId =
      req.cookies?.sessionId ||
      req.headers['x-session-id']?.toString() ||
      crypto.randomUUID();

    return this.correctionsService.correctAnonymous(sessionId, body.text);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('registered')
  async correctRegistered(@Req() req: any, @Body() body: { text: string }) {
    const userId = req.user.userId;
    return this.correctionsService.correctRegistered(userId, body.text);
  }
}
