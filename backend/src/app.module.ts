import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LetterController } from './app.controller';
import { LetterService } from './app.service';
import { Letter, letterSchema } from './models/letter/schemas/letter.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/letter'),
    MongooseModule.forFeature([{ name: Letter.name, schema: letterSchema }]),
  ],
  controllers: [LetterController],
  providers: [LetterService],
})
export class AppModule {}
