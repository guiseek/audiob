import { Song } from '@audiob/web/shared/data-access/models';
import { Observable } from 'rxjs';

export abstract class PlaylistRepository {
  abstract findAll(): Observable<Song[]>;
  abstract findOne(id: number): Observable<Song>;
}
