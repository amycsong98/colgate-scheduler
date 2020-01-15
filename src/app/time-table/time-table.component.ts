import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  days = ['time', 'M', 'T', 'W', 'Th', 'F'];
  times = [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  constructor() { }

  ngOnInit() {
    
  }

  test() {
    console.log('hello');
  }
}
