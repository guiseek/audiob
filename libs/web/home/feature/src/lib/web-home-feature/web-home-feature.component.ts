import { Component, OnInit } from '@angular/core';

import { PlaylistStore } from '@audiob/web/home/data-access';

@Component({
  selector: 'audiob-web-home-feature',
  templateUrl: './web-home-feature.component.html',
  styleUrls: ['./web-home-feature.component.scss']
})
export class WebHomeFeatureComponent implements OnInit {

  constructor(readonly playlistStore: PlaylistStore) { }

  ngOnInit(): void {
    console.log('init');
    
    this.playlistStore.loadSongs();
  }

}
