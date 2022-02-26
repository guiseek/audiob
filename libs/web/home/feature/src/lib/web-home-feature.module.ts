import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
})
export class WebHomeFeatureModule {}
