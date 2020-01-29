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

  test() {
    console.log(this.courseService.removeCourse('COSC 101 A'));
    // this.courseService.addCourse('COSC 102 B');
    // console.log(this.courseService.getCourses());
  }

  /*
  test() {
    console.log('hello');
    var element = document.getElementById("box-9");
    // element.setAttribute('ng-reflect-color', 'green');
    console.log(element.children[0])
    var child = element.children[0] as HTMLElement;
    child.style.backgroundColor = 'green';
    this.colors[14]='green';
    this.colors[15]='red';
    console.log(this.numOfBoxes)
  }*/
}
