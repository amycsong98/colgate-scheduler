import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
  ) { }

  // Search based on url input
  searchCourses(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  // Gets course list from cookie
  getCourses() {
    return this.strToList(this.cookieService.get('courses'));
  }

  // Adds a course to course list (cookie)
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
    this.setCourses(courses);
    return 'success';
  }

  // Removes a course from course list (cookie)
  removeCourse(DISPLAY_KEY: string) {
    let courses = this.getCourses();

    courses = courses.filter(e => e !== DISPLAY_KEY);
    this.setCourses(courses);
  }

  // helper functions
  // Sets courses to cookie
  setCourses(courses: string[]) {
    this.cookieService.set('courses', courses.join('|'), 365, '/');
  }

  // Checks if course list is empty (cookie)
  isCoursesEmpty(courses: string[]) {
    return courses === undefined || courses.length === 0 || courses[0] === '';
  }

  // Checks if the newCourse is in course list (cookie)
  isDuplicate(courses: string[], newCourse: string) {
    for (const course of courses) {
      if (course === newCourse) {
        return true;
      }
    }
    return false;
  }

  // Converts string to list (cookie)
  // delimiter: '|'
  strToList(str: string) {
    return str.split('|');
  }
}
