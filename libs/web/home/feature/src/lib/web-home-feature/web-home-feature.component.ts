import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { PlaylistStore } from '@audiob/web/home/data-access';
import { Song } from '@audiob/web/shared/data-access/models';

@Component({
  selector: 'audiob-web-home-feature',
  templateUrl: './web-home-feature.component.html',
  styleUrls: ['./web-home-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebHomeFeatureComponent implements AfterViewInit {
  @ViewChild('canvasRef')
  canvasRef!: ElementRef<HTMLCanvasElement>;
  canvasEl!: HTMLCanvasElement;

  barsColor = '#ff408180';

  audio = new Audio();

  currentSong: Song | null = null;

  private _currentTime = 0;

  set currentTime(value: number) {
    this._currentTime = value;
    this.audio.currentTime = value;
  }

  get currentTime() {
    return this._currentTime;
  }

  constructor(readonly playlistStore: PlaylistStore) {}

  ngAfterViewInit(): void {
    this.playlistStore.loadSongs();

    this.canvasEl = this.canvasRef.nativeElement;
  }

  afterViewTouched() {
    const audioCtx = new AudioContext();

    const canvasCtx = this.canvasEl.getContext('2d');
    const audioSourceNode = audioCtx.createMediaElementSource(this.audio);

    const analyserNode = audioCtx.createAnalyser();
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audioSourceNode.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);

    let bars: number;
    let barX: number;
    let barWidth: number;
    let barHeight: number;

    const render = () => {
      this.canvasEl.width = innerWidth - 40;

      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        canvasCtx.fillStyle = this.barsColor;

        bars = 300;

        for (let i = 0; i < bars; i++) {
          barWidth = this.canvasEl.width / bars;
          barX = i * (barWidth + 2);
          barHeight = -dataArray[i];
          canvasCtx.fillRect(barX, this.canvasEl.height, barWidth, barHeight);
        }
      }
    };

    const frameLooper = () => {
      requestAnimationFrame(frameLooper);
      analyserNode.getByteFrequencyData(dataArray);
      render();
    };

    this.audio.onplay = () => {
      frameLooper();
    };
  }

  setSong(song: Song) {
    this.audio.src = `assets/songs/${song.url}`;

    if (this.currentSong === null) {
      this.afterViewTouched();
    }

    this.currentSong = song;
    this.audio.load();
  }

  play(song: Song) {
    this.setSong(song);
    this.audio.play();
  }

  toggle() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  formatVolume(value: number) {
    return value + '%';
  }

  formatTime(value: number) {
    const s = value % 60 | 0;
    const m = (value / 60) % 60 | 0;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  onTimeUpdate(value: number | null = 0) {
    if (typeof value === 'number') {
      this.currentTime = value;
    }
  }

  onVolumeChange(value: number | null = 0) {
    if (typeof value === 'number') {
      this.audio.volume = value / 100;
    }
  }
}
