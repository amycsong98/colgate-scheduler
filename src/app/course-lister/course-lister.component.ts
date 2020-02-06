import { Component, OnInit } from '@angular/core';

import { ApiUrl } from '../api-url';
import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';

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
    private apiUrl: ApiUrl,
    private dataPassService: DataPassService
  ) { }

  ngOnInit() {
    this.courseService.searchCourses(this.apiUrl.testSearch).subscribe(
      res => {
        console.log(res);
        this.courses = res;
      }
    );
  }

  addCourse(course: any) {
    console.log(course);
  }

  hoverCourse(course: any) {
    this.dataPassService.sendData({ action: 'hover', data: course });
  }

  unhoverCourse(course: any) {
    this.dataPassService.sendData({ action: 'unhover', data: course });
  }
}
