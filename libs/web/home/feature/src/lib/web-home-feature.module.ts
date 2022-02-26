import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WebHomeDataAccess } from '@audiob/web/home/data-access';

import { WebHomeFeatureComponent } from './web-home-feature';


@NgModule({
  imports: [
    CommonModule,

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
