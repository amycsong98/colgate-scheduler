import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA
} from '../constants';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  displayedColumns: string[] = ['Course',	'Title',	'Meets',	'Status',	'Restrictions'];

  courses: object[];

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
  ) { }

  ngOnInit() {
    

    // initialize datapass service 
    // same as my time-table (modularize this)
    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_HOVER) {
          console.log(data);
        } else if (data[ACTION] === ACTION_UNHOVER) {
          console.log(data);
        } else if (data[ACTION] === ACTION_ADD) {
          this.courses.push(data);
        } else {
          console.log(data);
        }
      }
    );

    // get courses
    this.courses = this.courseService.getCourses();
    for (const course of this.courses) {
      console.log(course);
    }
  }

}
