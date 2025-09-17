import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { UseDto } from './dto/use.dto';

@Controller('anonymous')
export class AnonymousController{
    constructor(private readonly anonymousService: AnonymousService){}

//creea una nueva sesion anonima

    @Post('create/:sessionId')
    async createSession(@Param('sessionId')sessionId: string){
        return this.anonymousService.createSession(sessionId);
    }

    //resta uso
    @Post('use')
    async useCorrector(@Body() dto: UseDto){
        return this.anonymousService.useCorrector(dto);
    }

    @Get('remaining/:sessionId')
    async getRemainingUses(@Param('sessionId') sessionId: string){
        return this.anonymousService.getRemaining(sessionId);
    }
}