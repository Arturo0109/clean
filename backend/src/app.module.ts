import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './presentation/auth/auth.module';
import { PrismaService } from './infrastructure/prisma.service';
import { UsersModule } from './presentation/users/users.module';
import { CorrectionsModule } from './presentation/corrections/corrections.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    CorrectionsModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
