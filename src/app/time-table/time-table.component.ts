import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CourseService } from '../course.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, TIME_START,
  ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA, BOX_HEIGHT, BOX_MIN, NUM_ROW,
  DISPLAY_KEY, COURSE_STIME2, COURSE_STIME3, COURSE_ETIME2, COURSE_ETIME3
} from '../constants';
import { DataPassService } from '../data-pass.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements AfterViewInit {
  courses: any[];
  colorCols = [];

  constructor(
    private dataPassService: DataPassService,
    private renderer: Renderer2,
    private courseService: CourseService,
  ) { }

  ngAfterViewInit(): void {
    // initialize datapass service
    // same as my courses (modularize this)
    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_HOVER) {
          console.log(data);
          // this.displayCourse(data[DATA]);
        } else if (data[ACTION] === ACTION_UNHOVER) {
          console.log(data);
        } else if (data[ACTION] === ACTION_ADD) {
          console.log(data);
          this.addCourseToDisplay(data[DATA]);
        } else {
          console.log(data);
        }
      }
    );

    this.initializeColorCols();
    this.displayCourses();
  }

  initializeColorCols() {
    for (const col of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
      const colorColId = '#color-col-' + col;
      const x = this.renderer.selectRootElement(colorColId);
      this.colorCols.push(x);
    }
  }

  addCourseToDisplay(course: any) {
    const days = [];
    const sTimes = [];
    const eTimes = [];
    if (course[COURSE_DAYS1] !== null) {
      days.push(course[COURSE_DAYS1]);
      sTimes.push(this.parseTime(course[COURSE_STIME1]));
      eTimes.push(this.parseTime(course[COURSE_ETIME1]));
    }
    if (course[COURSE_DAYS2] !== null) {
      days.push(course[COURSE_DAYS2]);
      sTimes.push(this.parseTime(course[COURSE_STIME2]));
      eTimes.push(this.parseTime(course[COURSE_ETIME2]));
    }
    if (course[COURSE_DAYS3] !== null) {
      days.push(course[COURSE_DAYS3]);
      sTimes.push(this.parseTime(course[COURSE_STIME3]));
      eTimes.push(this.parseTime(course[COURSE_ETIME3]));
    }

    for (let i = 0; i < days.length; i++) {
      // calculate box height
      const duration = this.calcDuration(sTimes[i], eTimes[i]);
      const boxHeight = this.calcBoxHeight(duration);

      // prepare text inside the box
      const innerHTML = this.prepareInnerHTML(course[DISPLAY_KEY]);


      // calculate where the box starts
      const top = this.calcTop(sTimes[i]);
      this.colorTable(days[i], top, boxHeight, innerHTML);
    }
  }

  displayCourses() {
    this.courses = this.courseService.getCourses();
    console.log(this.courses);

    for (const course of this.courses) {
      this.addCourseToDisplay(course);
    }
  }

  prepareInnerHTML(displayKey: string) {
    return displayKey;
  }

  calcTop(beginTime: number[]) {
    const beginMin = (beginTime[0] - TIME_START) * 60 + beginTime[1];
    const totalMin = BOX_MIN * NUM_ROW;
    return beginMin / totalMin * 100;
  }

  colorTable(days: string, top: number, boxHeight: number, displayKey: string) {
    console.log(displayKey);
    for (const day of days) {
      const colorBox = this.renderer.createElement('div');
      this.renderer.addClass(colorBox, 'color-box');
      this.renderer.setAttribute(colorBox, 'style', this.formStyle(boxHeight, 'green', top));
      this.renderer.setProperty(colorBox, 'innerHTML', displayKey);
      this.renderer.appendChild(this.colorCols[this.dayToIndex(day)], colorBox);
    }
  }

  formStyle(boxHeight: number, backgroundColor: string, top: number) {
    return 'background-color: ' + backgroundColor + '; height: ' + boxHeight + 'px; top: ' + top + '%;';
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

  calcBoxHeight(duration: number) {
    // 60 min: BOX_HEIGHT (50px)
    // 50 min: 50 / 60 * 50
    return duration / BOX_MIN * BOX_HEIGHT;
  }

  // return time difference in minutes
  calcDuration(begin: number[], end: number[]) {
    const endToMin = end[0] * 60 + end[1];
    const beginToMin = begin[0] * 60 + begin[1];

    return endToMin - beginToMin;
  }

  // [hour, min, 'am' or 'pm']
  parseTime(time: any) {
    const parsedTime = time.split(':');
    parsedTime[0] = +parsedTime[0];
    parsedTime[1] = +parsedTime[1];
    if (parsedTime[2] === 'pm' && parsedTime[0] !== 12) {
      parsedTime[0] += 12;
    }
    parsedTime.splice(2, 1);
    console.log(parsedTime);
    return parsedTime;
  }
}
