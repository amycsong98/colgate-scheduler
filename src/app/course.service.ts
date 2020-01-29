import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private cookieService: CookieService) {

  }

  // need to check for duplicates
  addCourse(DISPLAY_KEY) {
    let courses = this.getCourses();
    // courses is empty
    if (courses === '') {
      courses = DISPLAY_KEY;
    } else {
      courses = courses + ',' + DISPLAY_KEY;
    }
    this.cookieService.set('courses', courses, 365, '/');
  }

  getCourses() {
    return this.cookieService.get('courses');
  }
}
