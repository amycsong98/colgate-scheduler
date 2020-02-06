import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { COURSES, SUCCESS, FAIL } from './constants';

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
    return this.strToList(this.cookieService.get(COURSES));
  }

  // Adds a course to course list (cookie)
  // course: object
  addCourse(course: any) {
    const courseJSON = JSON.stringify(course);
    let courses = this.getCourses();
    // courses is empty
    if (this.isCoursesEmpty(courses)) {
      courses = [courseJSON];
    } else {
      if (this.isDuplicate(courses, courseJSON)) {
        return FAIL;
      }
      courses.push(courseJSON);
    }
    this.setCourses(courses);
    return SUCCESS;
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
    this.cookieService.set(COURSES, courses.join('|'), 365, '/');
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
