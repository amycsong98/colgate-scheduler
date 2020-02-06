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
  getCourses(): any[] {
    return this.parseCourseCookie(this.cookieService.get(COURSES));
  }

  // Adds a course to course list (cookie)
  // course: object
  addCourse(course: any) {
    let courses = this.getCourses();
    // courses is empty
    if (this.isCoursesEmpty(courses)) {
      courses = [course];
    } else {
      if (this.isDuplicate(courses, course)) {
        return FAIL;
      }
      courses.push(course);
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
  setCourses(courses: any[]) {
    this.cookieService.set(COURSES, JSON.stringify(courses), 365, '/');
  }

  // Checks if course list is empty (cookie)
  isCoursesEmpty(courses: string[]) {
    return courses === undefined || courses.length === 0 || courses[0] === '';
  }

  // Checks if the newCourse is in course list (cookie)
  isDuplicate(courses: any[], newCourse: any) {
    for (const course of courses) {
      if (course['CRN'] === newCourse['CRN']) {
        return true;
      }
    }
    return false;
  }

  // Converts string to list (cookie)
  // delimiter: '|'
  parseCourseCookie(str: string) {
    return JSON.parse(str);
    // const strArray = str.split('|');
    // const courses = [];
    // console.log(strArray)
    // for (const e of strArray) {
    //   if (e) {
    //     console.log(JSON.parse(e));
    //     courses.push(JSON.parse(e));
    //   }
    // }
    // return courses;
  }
}
