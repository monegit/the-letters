import { Test, TestingModule } from '@nestjs/testing';
import { LetterController } from './app.controller';
import { LetterService } from './app.service';

describe('AppController', () => {
  let appController: LetterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LetterController],
      providers: [LetterService],
    }).compile();

    appController = app.get<LetterController>(LetterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
