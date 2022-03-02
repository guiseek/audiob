import { PlaylistRepository } from '@audiob/web/home/domain';
import { Song } from '@audiob/web/shared/data-access/models';
import { map, Observable, of } from 'rxjs';

export class PlaylistLocalRepository implements PlaylistRepository {
  findAll(): Observable<Song[]> {
    return of(
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

  findOne(id: number) {
    return this.findAll().pipe(
      map((songs) => {
        const song = songs.find((song) => song.id === id);

        if (!song) {
          throw new Error('Song not found');
        }

        return song;
      })
    );
  }
}
