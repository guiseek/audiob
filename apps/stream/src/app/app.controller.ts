import { Controller, Get, Param, StreamableFile, NotFoundException } from '@nestjs/common';

import { AppService } from './app.service';

import { createReadStream } from 'fs';
import { join } from 'path';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('songs')
  getSongs() {
    return this.appService.getSongs();
  }

  @Get('songs/:id')
  async getSong(@Param('id') id: string) {
    const song = await this.appService.getSong(+id);
    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const dir = `${__dirname}/assets`;
    const path = join(dir, song.url);
    const file = createReadStream(path);

    return new StreamableFile(file, {
      disposition: `attachment; filename=${song.url}`,
      type: 'audio/mpeg',
    });
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
