import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private cookieService: CookieService) {

  }

  // need to check for duplicates
  addCourse(DISPLAY_KEY: string) {
    let courses = this.getCourses();
    // courses is empty
    if (courses === '') {
      courses = DISPLAY_KEY;
    } else {
      if (this.isDuplicate(courses, DISPLAY_KEY)) {
        return 'fail';
      }
      courses = courses + ',' + DISPLAY_KEY;
    }
    this.cookieService.set('courses', courses, 365, '/');
    return 'success';
  }

  isDuplicate(courses: string, newCourse: string) {
    const coursesList = courses.split(',');
    for (const course of coursesList) {
      if (course === newCourse) {
        return true;
      }
    }
    return false;
  }

  getCourses() {
    return this.cookieService.get('courses');
  }
}
