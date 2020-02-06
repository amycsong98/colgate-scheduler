import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { COURSES, SUCCESS, FAIL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private cookieService: CookieService,
    private httpClient: HttpClient,
  ) { }

  // Search based on url input
  searchCourses(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  // Gets course list from local storage
  getCourses(): any[] {
    const courses = JSON.parse(localStorage.getItem(COURSES));
    if (courses) {
      return courses;
    } else {
      return [];
    }
  }

  // Adds a course to course list (cookie)
  // course: object
  addCourse(course: any) {
    let courses = this.getCourses();

    // 'course' exists in local storage
    if (courses) {
      if (this.isDuplicate(courses, course)) {
        return FAIL;
      }
      courses.push(course);
    } else { // no 'course' in local storage
      courses = [course];
    }
    this.setCourses(courses);
    return SUCCESS;
  }

  // Removes a course from course list (cookie)
  // needs to be done again
  removeCourse(DISPLAY_KEY: string) {
    let courses = this.getCourses();

    courses = courses.filter(e => e !== DISPLAY_KEY);
    this.setCourses(courses);
  }

  // helper functions
  // Sets courses to local storage
  setCourses(courses: any[]) {
    localStorage.setItem(COURSES, JSON.stringify(courses));
  }

  // Checks if the newCourse is in course list
  isDuplicate(courses: any[], newCourse: any) {
    for (const course of courses) {
      if (course['CRN'] === newCourse['CRN']) {
        return true;
      }
    }
    return false;
  }
}
