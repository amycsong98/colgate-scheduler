import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CourseService } from '../course.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, TIME_START,
  ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA, BOX_HEIGHT, BOX_MIN, NUM_ROW,
  DISPLAY_KEY, COURSE_STIME2, COURSE_STIME3, COURSE_ETIME2, COURSE_ETIME3, ACTION_DELETE, CRN, ACTION_TERM_CHANGE, COLOR
} from '../constants';
import { DataPassService } from '../data-pass.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements AfterViewInit {
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
          const course = data[DATA];
          this.addCourseToDisplay(course);
        } else if (data[ACTION] === ACTION_UNHOVER) {
          const course = data[DATA];
          this.removeCourseFromDisplay(course);
        } else if (data[ACTION] === ACTION_ADD) {
          this.addCourseToDisplay(data[DATA]);
        } else if (data[ACTION] === ACTION_DELETE ) {
          const course = data[DATA];
          this.removeCourseFromDisplay(course);
        } else if (data[ACTION] === ACTION_TERM_CHANGE) { // optimize this?
          this.colorCols = [];
          this.initializeColorCols();
          this.displayCourses();
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

  removeCourseFromDisplay(course: any) {
    const crn = course[CRN];
    for (let i = 0; i < this.colorCols.length; i++) {
      if (this.colorCols[i].childNodes.length > 0) {
        for (let j = 0; j < this.colorCols[i].childNodes.length; j++) {
          if (this.colorCols[i].childNodes[j].id === crn) {
            this.renderer.removeChild(this.colorCols[i], this.colorCols[i].childNodes[j]);
          }
        }
      }
    }
  }

  addCourseToDisplay(course: any) {
    const crn = course[CRN];
    const days = [];
    const sTimes = [];
    const eTimes = [];
    if (course[COURSE_DAYS1] !== null) {
      days.push(course[COURSE_DAYS1]);
      sTimes.push(this.courseService.parseTime(course[COURSE_STIME1]));
      eTimes.push(this.courseService.parseTime(course[COURSE_ETIME1]));
    }
    if (course[COURSE_DAYS2] !== null) {
      days.push(course[COURSE_DAYS2]);
      sTimes.push(this.courseService.parseTime(course[COURSE_STIME2]));
      eTimes.push(this.courseService.parseTime(course[COURSE_ETIME2]));
    }
    if (course[COURSE_DAYS3] !== null) {
      days.push(course[COURSE_DAYS3]);
      sTimes.push(this.courseService.parseTime(course[COURSE_STIME3]));
      eTimes.push(this.courseService.parseTime(course[COURSE_ETIME3]));
    }

    // Loop through meet time 1, 2, 3
    for (let i = 0; i < days.length; i++) {
      // calculate box height
      const duration = this.calcDuration(sTimes[i], eTimes[i]);
      const boxHeight = this.calcBoxHeight(duration);

      // prepare text inside the box
      const innerHTML = this.prepareInnerHTML(course[DISPLAY_KEY]);


      // calculate where the box starts
      const top = this.calcTop(sTimes[i]);

      if (!course[COLOR]) {
        course[COLOR] = '#808080';
      }
      this.colorTable(days[i], top, boxHeight, innerHTML, crn, course[COLOR]);
    }
  }

  displayCourses() {
    const courses = this.courseService.getCourses();

    for (const course of courses) {
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

  colorTable(days: string, top: number, boxHeight: number, displayKey: string, crn: string, color: string) {
    for (const day of days) {
      const colorBox = this.renderer.createElement('div');
      this.renderer.addClass(colorBox, 'color-box');
      this.renderer.setProperty(colorBox, 'id', crn); // to make deleting easy
      this.renderer.setAttribute(colorBox, 'style', this.formStyle(boxHeight, color, top));
      this.renderer.setProperty(colorBox, 'innerHTML', displayKey);
      this.renderer.appendChild(this.colorCols[this.courseService.dayToIndex(day)], colorBox);
    }
  }

  formStyle(boxHeight: number, backgroundColor: string, top: number) {
    return 'background-color: ' + backgroundColor + '; height: ' + boxHeight + 'px; top: ' + top + '%;';
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
}
