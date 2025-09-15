import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './presentation/auth/auth.module';
import { SpellcheckModule } from './spellcheck/spellcheck.module';

@Module({
  imports: [ConfigModule.forRoot({   isGlobal: true }),
    AuthModule,
    SpellcheckModule,

  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
