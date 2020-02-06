import { Component, OnInit } from '@angular/core';

import { DataPassService } from '../data-pass.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA
} from '../constants';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  displayedColumns = ['time', 'mon', 'tues', 'wed', 'thurs', 'fri'];
  dataSource = TIME_DATA;

  courses: any[];

  constructor(
    private dataPassService: DataPassService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    // initialize datapass service 
    // same as my courses (modularize this)
    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_HOVER) {
          console.log(data);
          this.displayCourse(data[DATA]);
        } else if (data[ACTION] === ACTION_UNHOVER) {
          console.log(data);
        } else if (data[ACTION] === ACTION_ADD) {
          console.log(data);
          this.addCourse(data[DATA]);
        } else {
          console.log(data);
        }
      }
    );
    // this.courseService.addCourse('COSC 102 A');
    this.displayCourses();
  }

  addCourse(data: any) {
    console.log(data);
  }

  displayCourses() {
    this.courses = this.courseService.getCourses();

    for (const course of this.courses) {
      const days1 = course[COURSE_DAYS1];

      if (days1 != null) {
        const beginTime1 = course[COURSE_STIME1];
        const endTime1 = course[COURSE_ETIME1];
      }
    }
  }

  displayCourse(course: any) {
    // parse data
    const days1 = course[COURSE_DAYS1];
    const days2 = course[COURSE_DAYS2];
    const dayt3 = course[COURSE_DAYS3];

    if (days1 != null) {
      const beginTime1 = course[COURSE_STIME1];
      const endTime1 = course[COURSE_ETIME1];

      console.log(days1);
      console.log(beginTime1);
      console.log(endTime1);
    }


  }
}

const TIME_DATA = [
  {time: '7 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '8 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '9 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '10 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '11 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '12 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '1 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '2 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '3 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '4 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '5 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '6 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '7 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '8 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '9 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '10 pm', m: '', t: '', w: '', r: '', f: ''},
];
