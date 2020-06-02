import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core';
import {AppRoutingModule} from './routing/app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
