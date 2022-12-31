import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WriteDocument = HydratedDocument<Write>;

@Schema()
export class Write {
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  writeAt: Date;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  data: string[][];
}

export const WriteSchema = SchemaFactory.createForClass(Write);
