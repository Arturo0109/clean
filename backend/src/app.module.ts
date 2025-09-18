import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './presentation/auth/auth.module';
import { PrismaService } from './infrastructure/prisma.service';
import {UsersModule} from './presentation/users/users.module';
import {CorrectionsModule} from './presentation/corrections/corrections.module';

@Module({
  imports: [AuthModule, UsersModule, CorrectionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
