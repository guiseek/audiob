import { Song } from '@audiob/web/shared/data-access/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSongs(): Promise<Song[]> {
    return Promise.resolve(
      [
        {
          title: 'Águas de março',
          artist: 'Tom Jobim',
          album: 'Tom Jobim',
          url: 'aguas-de-marco_-_tom-jobim.mp3',
        },
        {
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          album: 'Queen',
          url: 'bohemian-rhapsody_-_queen.mp3',
        },
        {
          title: "Gangster's Paradise",
          artist: 'Coolio',
          album: 'Coolio',
          url: 'coolio_-_gangsta-s-paradise.mp3',
        },
      ].map((song, id) => ({ ...song, id }))
    );
  }

  async getSong(id: number) {
    return this.getSongs().then((songs) =>
      songs.find((song) => song.id === id)
    );
  }

  getData(): { message: string } {
    return { message: 'Welcome to stream!' };
  }
}
