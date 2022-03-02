import {
  Res,
  Get,
  Param,
  Headers,
  Controller,
  NotFoundException,
} from '@nestjs/common';

import { AppService } from './app.service';

import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('songs')
  getSongs() {
    return this.appService.getSongs();
  }

  @Get('songs/:id')
  getSong(@Param('id') id: string) {
    return this.appService.getSong(+id);
  }

  async getStream(
    @Param('id') id: string,
    @Headers('range') range: string,
    @Res() res: Response
  ) {
    const song = await this.appService.getSong(+id);

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const dir = `${__dirname}/assets`;
    const path = join(dir, song.url);

    const { size } = statSync(path);
    const chunk = 10 ** 6;
    
    const start = +range.replace('/\\D/g', '');
    const end = Math.min(start + chunk, size - 1);

    const file = createReadStream(path, { start, end });

    const headers = [
      ['Accept-Ranges', 'bytes'],
      ['Content-Range', `bytes ${start}-${end}/${size}`],
      ['Content-Length', (end - start + 1).toString()],
      ['Content-Type', 'audio/mpeg'],
    ];

    headers.forEach(([key, value]) => res.headers.set(key, value));

    return file.pipe(res as any);

    // const file = createReadStream(audioPath);
    // return new StreamableFile(file, {
    //   disposition: `attachment; filename=${song.url}`,
    //   type: 'audio/mpeg',
    // });
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
