import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import {
  COURSES, SUCCESS, FAIL, CRN, URL_PROGRAM_AREAS, URL_CORE_AREAS, URL_TERMS, URL_INQUIRY_AREAS, ACTION_ADD, ACTION_TERM_CHANGE,
  COURSE_DAYS1, COURSE_STIME1, COURSE_ETIME1, COURSE_STIME2, DISPLAY_KEY, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME3, COURSE_ETIME2,
  COURSE_ETIME3, COLOR, COURSE_STIME_AMPM1, COURSE_STIME_AMPM2, COURSE_STIME_AMPM3, COURSE_ETIME_AMPM1, COURSE_ETIME_AMPM2,
  COURSE_ETIME_AMPM3, ACTION_DELETE
} from './constants';
import { DataPassService } from './data-pass.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  currentTerm: string;
  colors = ['#f7e8f0', '#f1c6de', '#e89da2', '#ecb390', '#fcf8e8', '#ccedd2', '#b9cced', '#e1ccec', '#ececec', '#c7b198'];

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private dataPassService: DataPassService,
  ) { }

  setCurrentTerm(term: string) {
    this.currentTerm = term;
    this.dataPassService.sendData({ action: ACTION_TERM_CHANGE, data: term });
  }

  getCurrentTerm(): string {
    return this.currentTerm;
  }

  // Search based on url input
  searchCourses(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  // Gets course list from local storage
  getCourses(): any[] {
    const courses = JSON.parse(localStorage.getItem(this.currentTerm));
    if (courses) {
      return courses;
    } else {
      return [];
    }
  }

  addColor(course: any) {
    const max = this.colors.length - 1;
    const min = 0;
    const rand = Math.floor(Math.random() * (max - min) + min);
    course[COLOR] = this.colors[rand];
  }

  // Adds a course to course list (cookie)
  // course: object
  addCourse(course: any) {
    this.addColor(course);

    let courses = this.getCourses();

    // 'course' exists in local storage
    if (courses) {
      if (this.isDuplicate(course)) {
        alert('The class is already added ' + course[DISPLAY_KEY] + '.');
        return { result: FAIL, message: 'The class is already added.' };
      } else if (this.isTimeDuplicate(courses, course)) {
        alert('Time conflict found');
        return { result: FAIL, message: 'Time conflict.' };
      }
      courses.push(course);
    } else { // no 'course' in local storage
      courses = [course];
    }
    this.setCourses(courses);
    this.dataPassService.sendData({ action: ACTION_ADD, data: course });
    return SUCCESS;
  }

  // Deletes a course from course list (cookie)
  // needs to be done again
  deleteCourse(course: any) {
    let courses = this.getCourses();
    courses = courses.filter(e => e[CRN] !== course[CRN]);
    this.setCourses(courses);
  }

  // helper functions
  // Sets courses to local storage
  setCourses(courses: any[]) {
    localStorage.setItem(this.currentTerm, JSON.stringify(courses));
  }

  // Checks if the newCourse is in course list
  isDuplicate(newCourse: any): boolean {
    const courses = this.getCourses();

    for (const course of courses) {
      if (course[CRN] === newCourse[CRN]) {
        return true;
      }
    }
    return false;
  }

  isTimeDuplicate(courses: any[], newCourse: any): boolean {
    const allDaysNew = this.getAllCourseDays(newCourse);
    const allStartTimeNew = this.getAllCourseStartTime(newCourse);
    const allEndTimeNew = this.getAllCourseEndTime(newCourse);
    for (const course of courses) {
      const allDays = this.getAllCourseDays(course);
      const allStartTime = this.getAllCourseStartTime(course);
      const allEndTime = this.getAllCourseEndTime(course);

      for (const daysNew of allDaysNew) {
        for (const days of allDays) {
          if (this.daysConflict(daysNew, days)) {
            for (let i = 0; i < allStartTimeNew.length; i++) {
              for (let j = 0; j < allStartTime.length; j++) {
                if (this.timesConflict(allStartTimeNew[i], allEndTimeNew[i], allStartTime[j], allEndTime[j])) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  getAllCourseDays(course: any): string[] {
    const allDays = [course[COURSE_DAYS1], course[COURSE_DAYS2], course[COURSE_DAYS3]];
    return allDays.filter(e => e); // filter nulls
  }

  getAllCourseStartTime(course: any): number[][] {
    const allStartTime = [this.parseTime(course[COURSE_STIME1], course[COURSE_STIME_AMPM1]), this.parseTime(course[COURSE_STIME2],
      course[COURSE_STIME_AMPM2]), this.parseTime(course[COURSE_STIME3], course[COURSE_STIME_AMPM3])];
    return allStartTime.filter(e => e);
  }

  getAllCourseEndTime(course: any): number[][] {
    const allEndTime = [this.parseTime(course[COURSE_ETIME1], course[COURSE_ETIME_AMPM1]),
    this.parseTime(course[COURSE_ETIME2], course[COURSE_ETIME_AMPM2]), this.parseTime(course[COURSE_ETIME3], course[COURSE_ETIME_AMPM3])];
    return allEndTime.filter(e => e);
  }

  // days: "MWF"
  daysConflict(days1: string, days2: string) {
    const conflictChecker = [0, 0, 0, 0, 0];
    for (const day of days1) {
      conflictChecker[this.dayToIndex(day)]++;
    }
    for (const day of days2) {
      conflictChecker[this.dayToIndex(day)]++;
    }
    for (const count of conflictChecker) {
      if (count === 2) {
        return true;
      }
    }
    return false;
  }

  timesConflict(parsedStart1: number[], parsedEnd1: number[], parsedStart2: number[], parsedEnd2: number[]): boolean {
    const startToMin1 = this.parsedToMin(parsedStart1);
    const endToMin1 = this.parsedToMin(parsedEnd1);
    const startToMin2 = this.parsedToMin(parsedStart2);
    const endToMin2 = this.parsedToMin(parsedEnd2);

    if (startToMin1 >= startToMin2 && startToMin1 <= endToMin2 || endToMin1 >= startToMin2 && endToMin1 <= endToMin2) {
      return true;
    }
    return false;
  }

  parsedToMin(parsedTime: number[]): number {
    return parsedTime[0] * 60 + parsedTime[1];
  }

  // [hour, min] => [hour, min] in 24 hour format
  parseTime(time: any, ampm: string): number[] {
    if (time) {
      const parsedTime = time.split(':');
      parsedTime[0] = +parsedTime[0];
      parsedTime[1] = +parsedTime[1];
      if (ampm === 'pm' && parsedTime[0] !== 12) {
        parsedTime[0] += 12;
      }
      parsedTime.splice(2, 1);
      console.log(parsedTime);
      return parsedTime;
    }
    return null;
  }

  getTerms(): Observable<any> {
    return this.httpClient.get(URL_TERMS);
  }

  getPrograms(): Observable<any> {
    return this.httpClient.get(URL_PROGRAM_AREAS);
  }

  getInquiryAreas(): Observable<any> {
    return this.httpClient.get(URL_INQUIRY_AREAS);
  }

  getCoreAreas(): Observable<any> {
    return this.httpClient.get(URL_CORE_AREAS);
  }

  dayToIndex(day: string) {
    switch (day) {
      case 'M':
        return 0;
      case 'T':
        return 1;
      case 'W':
        return 2;
      case 'R':
        return 3;
      case 'F':
        return 4;
      default:
        return -1;
    }
  }

  ampmAppended(course: any): boolean {
    // if (course[COURSE_STIME1].split(':').length > 2) {
    //   return true;
    // }
    // return false;

    if (course[COURSE_STIME_AMPM1]) {
      return true;
    }
    return false;
  }

  guessAmPmAndAppend(course: any) {
    if (this.ampmAppended(course)) {
      console.log('ampm already appended');
      return course;
    }

    const allStartTimeNew = this.getAllCourseStartTime(course);
    const allEndTimeNew = this.getAllCourseEndTime(course);
    const startAmPms = [];
    const endAmPms = [];

    // guess ampm
    for (let i = 0; i < allStartTimeNew.length; i++) {
      let startAmPm = this.guessAmPm(allStartTimeNew[i], true);
      let endAmPm = this.guessAmPm(allEndTimeNew[i], false);

      if (startAmPm === 'pm') {
        endAmPm = 'pm';
      } else if (startAmPm === 'ambiguous' && endAmPm !== 'ambiguous') {
        startAmPm = 'am';
      } else if (endAmPm === 'ambiguous' && startAmPm !== 'ambiguous') {
        endAmPm = 'pm';
      }

      if (startAmPm !== 'ambiguous') {
        startAmPms.push(startAmPm);
        endAmPms.push(endAmPm);
      } else {
        const ampm = this.guessAmPmBasedOnTimeSchedule(allStartTimeNew[i], allEndTimeNew[i]);
        if (ampm !== 'ambiguous') {
          startAmPms.push(ampm);
          endAmPms.push(ampm);
        } else {
          // final step => ask 
          // just put am for now
          console.log('ambiguous time');
          startAmPms.push('am');
          endAmPms.push('am');
        }
      }
    }

    // append ampm; hard coded fix later
    course[COURSE_STIME_AMPM1] = startAmPms[0];
    course[COURSE_STIME_AMPM2] = startAmPms[1];
    course[COURSE_STIME_AMPM3] = startAmPms[2];
    course[COURSE_ETIME_AMPM1] = endAmPms[0];
    course[COURSE_ETIME_AMPM2] = endAmPms[1];
    course[COURSE_ETIME_AMPM3] = endAmPms[2];
  }

  /*
    start:
      [10:20~11:59] => am
      [12:00~7:55) => pm
      [7:55~10:20) => ambiguous
    end:
      (10:20~11:59] => am
      [12:00~7:55] => pm
      (7:55~10:20] => ambiguous

    come up with a good return
  */
  guessAmPm(time: number[], start: boolean): string {
    const min = this.parsedToMin(time);
    // start time
    if (start) {
      if (min >= 620 && min <= 719) { // am
        return 'am';
      } else if (min >= 720 && min <= 779 || min >= 60 && min <= 474) { // pm
        return 'pm';
      } else {
        return 'ambiguous';
      }
    } else {
      if (min >= 621 && min <= 719) { // am
        return 'am';
      } else if (min >= 720 && min <= 779 || min >= 60 && min <= 475) { // pm
        return 'pm';
      } else {
        return 'ambiguous';
      }
    }
  }

  /* 
    time schedule blocks that is ambiguous on guessAmPm:
    8:20 ~ 9:10
    9:20 ~ 10:10
    10:20 ~ 11:10
    7:55 ~ 9:10
    8:30 ~ 9:45
    9:55 ~ 11:10
  */
  guessAmPmBasedOnTimeSchedule(stime: number[], etime: number[]): string {
    const timeBlockStarts = [[8, 20], [9, 20], [10, 20], [7, 55], [8, 30], [9, 55]];
    const timeBlockEnds = [[9, 10], [10, 10], [11, 10], [9, 10], [9, 45], [11, 10]];

    for (let i = 0; i < timeBlockStarts.length; i++) {
      if (
        this.parsedToMin(stime) === this.parsedToMin(timeBlockStarts[i]) &&
        this.parsedToMin(etime) === this.parsedToMin(timeBlockEnds[i])
      ) {
        return 'am';
      }
    }
    return 'ambiguous';
  }

  updateCourse(course: any) {
    let courses = this.getCourses();
    courses = courses.filter(e => e[CRN] !== course[CRN]);
    courses.push(course);
    this.setCourses(courses);
    this.dataPassService.sendData({ action: ACTION_DELETE, data: course }); // to update time table & my courses
    this.dataPassService.sendData({ action: ACTION_ADD, data: course });
  }
}

