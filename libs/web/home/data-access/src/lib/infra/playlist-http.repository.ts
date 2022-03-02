import { PlaylistRepository } from '@audiob/web/home/domain';
import { Song } from '@audiob/web/shared/data-access/models';
import { from } from 'rxjs';

export class PlaylistHttpRepository implements PlaylistRepository {
  findAll() {
    return from<Promise<Song[]>>(
      fetch('/api/songs').then((res) => {
        if (!res.ok || !res.body) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
    );
  }

  findOne(id: number) {
    return from<Promise<Song>>(
      fetch(`/api/songs/${id}`).then((res) => {
        if (!res.ok || !res.body) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
    );
  }
}
