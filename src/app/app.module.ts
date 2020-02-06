// anguular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// angular material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { CookieService } from 'ngx-cookie-service';

// local imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFormComponent } from './search-form/search-form.component';
import { ApiUrl } from './api-url';
import { CourseListerComponent } from './course-lister/course-lister.component';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    CourseListerComponent,
    TimeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTableModule
  ],
  providers: [
    CookieService,
    ApiUrl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
