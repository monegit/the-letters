import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Letter, LetterDocument } from './models/letter/schemas/letter.schema';

@Injectable()
export class LetterService {
  constructor(
    @InjectModel(Letter.name) private letterModel: Model<LetterDocument>,
  ) {}
  async write(name: string, data: string[][], password: string) {
    await this.letterModel.create({ name, data, password });
  }
  async read(name: string, password: string) {
    return await this.letterModel
      .findOne({ name: name, password: password })
      .exec();
  }
}
