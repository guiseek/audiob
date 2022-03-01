import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { WebHomeDataAccess } from '@audiob/web/home/data-access';

import { WebHomeFeatureComponent } from './web-home-feature';


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSliderModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WebHomeFeatureComponent,
      }
    ]),
  ],
  declarations: [
    WebHomeFeatureComponent
  ],
  providers: [
    WebHomeDataAccess.providers
  ]
})
export class WebHomeFeatureModule {}
