// angular imports
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CookieService } from 'ngx-cookie-service';
import { StorageServiceModule } from 'angular-webstorage-service';

// local imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFormComponent } from './search-form/search-form.component';
import { CourseListerComponent } from './course-lister/course-lister.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { MyCoursesComponent, DialogCourseSettingsComponent } from './my-courses/my-courses.component';
import { HeaderMenuComponent, DialogScheduleNameComponent } from './header-menu/header-menu.component';
import { SearchComponent, DialogSearchComponent } from './search/search.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    CourseListerComponent,
    TimeTableComponent,
    MyCoursesComponent,
    HeaderMenuComponent,
    DialogCourseSettingsComponent,
    DialogScheduleNameComponent,
    SearchComponent,
    DialogSearchComponent,
    ColorPickerComponent
  ],
  entryComponents: [
    DialogCourseSettingsComponent,
    DialogScheduleNameComponent,
    DialogSearchComponent
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
    MatTableModule,
    StorageServiceModule,
    MatDialogModule,
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatButtonToggleModule,
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
