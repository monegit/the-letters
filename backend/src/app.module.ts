import { Module } from '@nestjs/common';
import { AppController, Write } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, Write],
  providers: [AppService],
})
export class AppModule {}
