import { PlaylistStore } from "./store/playlist.store";

export function webHomeDataAccess(): string {
  return 'web-home-data-access';
}

export class WebHomeDataAccess {
  static get providers() {
    return [
      {
        provide: PlaylistStore,
        useFactory: () => new PlaylistStore(),
      },
    ];
  }
}