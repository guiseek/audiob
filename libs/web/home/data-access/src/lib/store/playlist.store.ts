import { GenericState, Song } from '@audiob/web/shared/data-access/models';
import { DataStore } from '@audiob/web/shared/data-access/store';
import { PlaylistRepository } from '@audiob/web/home/domain';
import { catchError, take } from 'rxjs';

interface HomeState extends GenericState<Song[]> {
  selectedSong: Song | null;
}

export class PlaylistStore extends DataStore<HomeState> {
  status$ = this.select((state) => state.status);

  error$ = this.select((state) => state.error);

  data$ = this.select((state) => state.data);

  selectedSong$ = this.select((state) => state.selectedSong);

  constructor(private repository: PlaylistRepository) {
    super({
      selectedSong: null,
      status: 'loading',
      error: null,
      data: [],
    });
  }

  loadSongs() {
    this.setState({ status: 'pending' });

    this.repository
      .findAll()
      .pipe(
        take(1),
        catchError((err) => {
          if (err) this.setError(err);
          throw err;
        })
      )
      .subscribe((songs) => this.setSongs(songs));
  }

  nextSong() {
    let { id = 0 } = this.state.selectedSong ?? {};

    if (id < this.state.data.length - 1) id++;
    else id = 0;

    this.setSong(this.state.data[id]);
  }

  prevSong() {
    let { id = 0 } = this.state.selectedSong ?? {};

    if (id > 0) id--;
    else id = this.state.data.length - 1;

    this.setSong(this.state.data[id]);
  }

  loadSong(id: number) {
    this.setState({ status: 'pending' });

    this.repository
      .findOne(id)
      .pipe(
        take(1),
        catchError((err) => {
          if (err) this.setError(err);
          throw err;
        })
      )
      .subscribe((song) => this.setSong(song));
  }

  private setSongs(songs: Song[]) {
    this.setState({ status: 'loaded', data: songs });
  }

  private setSong(song: Song) {
    this.setState({ status: 'loaded', selectedSong: song });
  }

  private setError({ message }: Error) {
    this.setState({ status: 'error', error: message });
  }
}
