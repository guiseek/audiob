import { PlaylistLocalRepository } from './infra/playlist-local.repository';
// import { PlaylistHttpRepository } from './infra/playlist-http.repository';
import { PlaylistRepository } from '@audiob/web/home/domain';
import { PlaylistStore } from './store/playlist.store';

export function webHomeDataAccess(): string {
  return 'web-home-data-access';
}

export class WebHomeDataAccess {
  static get providers() {
    return [
      {
        provide: PlaylistRepository,
        useClass: PlaylistLocalRepository,
      },
      {
        provide: PlaylistStore,
        useFactory: (repository: PlaylistRepository) => {
          return new PlaylistStore(repository);
        },
        deps: [PlaylistRepository],
      },
    ];
  }
}
