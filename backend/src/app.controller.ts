import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LetterService } from './app.service';

@Controller('letter')
export class LetterController {
  constructor(private readonly service: LetterService) {}

  @Get('/receive')
  async receiveLetter(
    @Query('name') name: string,
    @Query('password') password: string,
  ) {
    // return (await this.service.read(name, password)).toJSON();
    return (await this.service.read(name, password)).toJSON();

    // return '';
    // this.service.read(name, password);
    // console.log(await this.service.read(name, password));
    // return JSON.stringify(await this.service.read(name, password));
  }

  @Post('/send')
  async sendLetter(@Body('name') name: string, @Body('data') data: string[][]) {
    const password = Math.random().toString(32).substring(2);
    this.service.write(name, data, password);
    console.log('asdf');

    // 이름, 비밀번호 전송
    return JSON.stringify({ name: name, password: password });
  }
}
