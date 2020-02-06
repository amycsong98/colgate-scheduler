import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  days: string[] = ['time', 'M', 'T', 'W', 'Th', 'F'];
  times: number[] = [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  
  numOfBoxes: number = this.days.length * this.times.length;

  colors: string[] = new Array<string>(this.numOfBoxes);

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    console.log(this.courseService.getCourses());
  }
}
