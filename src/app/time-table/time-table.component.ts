import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    
  }

  test() {
    // console.log('hello');
    // var element = document.getElementById("Th-10");
    // element.setAttribute('ng-reflect-color', 'green');
    // console.log(element)
    this.colors[14]='green';
    this.colors[15]='red';
    console.log(this.numOfBoxes)
  }
}
