import { Module } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { AnonymousController } from './anonymous.controller';
import { PrismaService } from '../../infrastructure/prisma.service';

@Module({

    controllers: [AnonymousController],
    providers: [AnonymousService, PrismaService],
    exports: [AnonymousService],
})

export class AnonymousModule {}