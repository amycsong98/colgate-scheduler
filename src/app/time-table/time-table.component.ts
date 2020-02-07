import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CourseService } from '../course.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, TIME_START,
  ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA, BOX_HEIGHT, BOX_MIN, NUM_ROW,
  DISPLAY_KEY
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
    const days1 = course[COURSE_DAYS1];

    if (days1 != null) {
      // beginTime = [hour, min]: string[]
      const beginTime1 = this.parseTime(course[COURSE_STIME1]);
      const endTime1 = this.parseTime(course[COURSE_ETIME1]);

      // calculate box height
      const duration = this.calcDuration(beginTime1, endTime1);
      const boxHeight = this.calcBoxHeight(duration);

      // prepare text inside the box
      const innerHTML = this.prepareInnerHTML(course[DISPLAY_KEY]);

      // calculate where the box starts
      const top = this.calcTop(beginTime1);
      this.colorTable(days1, top, boxHeight, innerHTML);
    }
  }

  displayCourses() {
    this.courses = this.courseService.getCourses();
    console.log(this.courses);

    for (const course of this.courses) {
      const days1 = course[COURSE_DAYS1];

      if (days1 != null) {
        // beginTime = [hour, min]: string[]
        const beginTime1 = this.parseTime(course[COURSE_STIME1]);
        const endTime1 = this.parseTime(course[COURSE_ETIME1]);

        // calculate box height
        const duration = this.calcDuration(beginTime1, endTime1);
        const boxHeight = this.calcBoxHeight(duration);

        // prepare text inside the box
        const innerHTML = this.prepareInnerHTML(course[DISPLAY_KEY]);

        // calculate where the box starts
        const top = this.calcTop(beginTime1);
        this.colorTable(days1, top, boxHeight, innerHTML);
      }
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

  parseTime(time: string) {
    return time.split(':').map(Number);
  }
}
