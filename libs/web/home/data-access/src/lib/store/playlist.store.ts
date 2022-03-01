import { GenericState, Song } from '@audiob/web/shared/data-access/models';
import { DataStore } from '@audiob/web/shared/data-access/store';

interface HomeState extends GenericState<Song[]> {
  selectedSong: Song | null;
}

export class PlaylistStore extends DataStore<HomeState> {
  status$ = this.select((state) => state.status);

  error$ = this.select((state) => state.error);

  data$ = this.select((state) => state.data);

  constructor() {
    super({
      selectedSong: null,
      status: 'loading',
      error: null,
      data: [],
    });
  }

  loadSongs() {
    fetch('/api/songs')
      .then((res) => {
        if (!res.ok || !res.body) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((songs) => {
        this.setState({
          status: 'loaded',
          data: songs,
        });
      })
      .catch((err) => {
        this.setState({
          status: 'error',
          error: err,
        });
      });
  }

  loadSong(id: number) {
    fetch(`/api/songs/${id}`)
      .then((res) => {
        if (!res.ok || !res.body) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((song) => {
        this.setState({
          selectedSong: song,
        });
      })
      .catch((err) => {
        this.setState({
          status: 'error',
          error: err,
        });
      });
  }

  selectSong(song: Song) {
    this.setState({
      selectedSong: song,
    });
  }
}
