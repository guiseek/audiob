import { Song } from '@audiob/web/shared/data-access/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSongs(): Promise<Song[]> {
    return Promise.resolve([
      {
        id: 1,
        title: 'Song 1',
        artist: 'Artist 1',
        album: 'Album 1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        id: 2,
        title: 'Song 2',
        artist: 'Artist 2',
        album: 'Album 2',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        id: 3,
        title: 'Song 3',
        artist: 'Artist 3',
        album: 'Album 3',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ]);
  }

  getData(): { message: string } {
    return { message: 'Welcome to stream!' };
  }
}
