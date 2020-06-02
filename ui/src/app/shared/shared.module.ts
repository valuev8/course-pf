import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import {LayoutComponent} from './layout/layout.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { CardComponent } from './card/card.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    LayoutComponent,
    PlayerComponent,
    CardComponent,
  ],
  declarations: [
    LayoutComponent,
    PlayerComponent,
    CardComponent
  ]
})
export class SharedModule {
}
