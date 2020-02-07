import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CourseService } from '../course.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1,
  ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA, BOX_HEIGHT, BOX_MIN
} from '../constants';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements AfterViewInit {
  courses: any[];

  constructor(
    private renderer: Renderer2,
    private courseService: CourseService,
  ) { }

  ngAfterViewInit(): void {
    this.displayCourses();
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

        const duration = this.calcDuration(beginTime1, endTime1);
        const boxHeight = this.calcBoxHeight(duration);

        this.colorTable(days1, beginTime1, boxHeight);
      }
    }
  }

  colorTable(days: string, begin: number[], boxHeight: number) {
    let x = this.renderer.selectRootElement('#color-col-Thursday');
    const colorBox = this.renderer.createElement('div');
    this.renderer.setAttribute(colorBox, 'style', 'background-color: black; height:50px; position: absolute; width: 100px;');
    this.renderer.addClass(colorBox, 'color-box');
    this.renderer.appendChild(x, colorBox);

    const colorBox2 = this.renderer.createElement('div');
    this.renderer.setAttribute(colorBox2, 'style', 'background-color: green; top: 5.88%; height:50px; position: absolute; width: 100px;');
    this.renderer.appendChild(x, colorBox2);

    let y = this.renderer.selectRootElement('#color-col-Monday');
    const colorBox3 = this.renderer.createElement('div');
    this.renderer.setAttribute(colorBox3, 'style', 'background-color: red; top: 5.88%; height:50px; position: absolute; width: 100px;');
    this.renderer.addClass(colorBox3, 'color-box');
    this.renderer.appendChild(y, colorBox3);

    console.log(x);
    
    // x.style.background = 'black';
    // console.log(x);
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
