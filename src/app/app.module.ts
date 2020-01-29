import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    TimeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
