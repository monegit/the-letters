import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LetterDocument = HydratedDocument<Letter>;

@Schema()
export class Letter {
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  writeAt: Date;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  data: string[][][];
}

export const letterSchema = SchemaFactory.createForClass(Letter);
