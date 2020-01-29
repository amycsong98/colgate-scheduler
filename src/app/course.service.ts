import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private cookieService: CookieService) {

  }

  getCourses() {
    return this.str2list(this.cookieService.get('courses'));
  }

  addCourse(DISPLAY_KEY: string) {
    let courses = this.getCourses();
    // courses is empty
    if (this.isCoursesEmpty(courses)) {
      courses = [DISPLAY_KEY];
      console.log('test:' + courses);
    } else {
      if (this.isDuplicate(courses, DISPLAY_KEY)) {
        return 'fail';
      }
      courses.push(DISPLAY_KEY);
    }
    this.cookieService.set('courses', courses.join('|'), 365, '/');
    return 'success';
  }

  // helper functions
  isCoursesEmpty(courses: string[]) {
    return courses === undefined || courses.length === 0 || courses[0] === '';
  }

  // checks if newCourse is in courses
  isDuplicate(courses: string[], newCourse: string) {
    for (const course of courses) {
      if (course === newCourse) {
        return true;
      }
    }
    return false;
  }

  // delimiter: '|'
  str2list(str: string) {
    return str.split('|');
  }
}
