import { Component, OnInit } from '@angular/core';

import { ApiUrl } from '../api-url';
import { CourseService } from '../course.service';

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
    console.log(course);
  }

  unhoverCourse(course: any) {
    console.log('leave: ' + course);
  }
}
