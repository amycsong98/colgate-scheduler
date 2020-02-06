import { Component, OnInit } from '@angular/core';

import { URL_TEST, ACTION_ADD } from '../constants';
import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';
import { ACTION_HOVER, ACTION_UNHOVER } from '../constants';

@Component({
  selector: 'app-course-lister',
  templateUrl: './course-lister.component.html',
  styleUrls: ['./course-lister.component.css']
})
export class CourseListerComponent implements OnInit {
  displayedColumns: string[] = ['Course',	'Title',	'Meets',	'Status',	'Restrictions'];

  courses: object[];

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit() {
    this.courseService.searchCourses(URL_TEST).subscribe(
      res => {
        console.log(res);
        this.courses = res;
      }
    );
  }

  addCourse(course: any) {
    this.courseService.addCourse(course);
    this.dataPassService.sendData({ action: ACTION_ADD, data: course });
  }

  hoverCourse(course: any) {
    this.dataPassService.sendData({ action: ACTION_HOVER, data: course });
  }

  unhoverCourse(course: any) {
    this.dataPassService.sendData({ action: ACTION_UNHOVER, data: course });
  }
}
