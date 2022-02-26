import { GenericState, Song } from '@audiob/web/shared/data-access/models';
import { DataStore } from '@audiob/web/shared/data-access/store';
import { timer } from 'rxjs';


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
    timer(1000).subscribe(() => {
      this.setState({
        status: 'loaded',
        data: [
          {
            id: 1,
            title: 'Song 1',
            artist: 'Artist 1',
            album: 'Album 1',
            duration: 123,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            id: 2,
            title: 'Song 2',
            artist: 'Artist 2',
            album: 'Album 2',
            duration: 234,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            id: 3,
            title: 'Song 3',
            artist: 'Artist 3',
            album: 'Album 3',
            duration: 345,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        ],
      });
    });

    // fetch("https://audiob-api.herokuapp.com/api/v1/songs")
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       status: 'success',
    //       error: null,
    //       data: data,
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       status: 'error',
    //       error: error,
    //       data: [],
    //     });
    //   });
  }

  selectSong(song: Song) {
    this.setState({
      selectedSong: song,
    });
  }
}
