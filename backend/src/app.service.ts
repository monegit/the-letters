import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Write, WriteDocument } from './models/letter/schemas/letter.schema';

@Injectable()
export class LetterService {
  constructor(
    @InjectModel(Write.name) private writeModel: Model<WriteDocument>,
  ) {}
  async write(name: string, data: string[][], password: string) {
    await this.writeModel.create({ name, data, password });
  }
}
